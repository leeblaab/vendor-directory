'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  AppUser,
  AuthResponse,
  loginUser,
  registerUser,
  logoutUser,
  refreshAuthToken,
  getCurrentUser,
} from '@/lib/directus';

// ============ TYPES ============

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name?: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============ STORAGE KEYS ============

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'sf_access_token',
  REFRESH_TOKEN: 'sf_refresh_token',
  TOKEN_EXPIRY: 'sf_token_expiry',
};

// ============ PROVIDER COMPONENT ============

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  // Get current access token from storage
  const getToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  // Get refresh token from storage
  const getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  };

  // Save auth tokens to storage
  const saveAuthData = (authData: AuthResponse) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refresh_token);
    localStorage.setItem(
      STORAGE_KEYS.TOKEN_EXPIRY,
      String(Date.now() + authData.expires)
    );
    setUser(authData.user);
  };

  // Clear all auth data from storage
  const clearAuthData = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
    setUser(null);
  };

  // Try to refresh the token if it's about to expire
  const tryRefreshToken = useCallback(async () => {
    const refreshToken = getRefreshToken();
    const expiryStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
    
    if (!refreshToken || !expiryStr) return;

    const expiry = parseInt(expiryStr, 10);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    // Refresh if token expires within 5 minutes
    if (expiry - now < fiveMinutes) {
      const newAuth = await refreshAuthToken(refreshToken);
      if (newAuth) {
        saveAuthData(newAuth);
      } else {
        clearAuthData();
      }
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Validate token by fetching current user
      const currentUser = await getCurrentUser(token);
      
      if (currentUser) {
        setUser(currentUser);
        // Try to refresh token if needed
        await tryRefreshToken();
      } else {
        // Token is invalid, clear everything
        clearAuthData();
      }
      
      setIsLoading(false);
    };

    initAuth();

    // Set up token refresh interval (every 5 minutes)
    const refreshInterval = setInterval(tryRefreshToken, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [getToken, tryRefreshToken]);

  // Login function
  const login = async (email: string, password: string) => {
    const authData = await loginUser(email, password);
    
    if (!authData) {
      return { success: false, message: 'Invalid email or password' };
    }

    saveAuthData(authData);
    return { success: true, message: 'Logged in successfully' };
  };

  // Register function
  const register = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name?: string;
  }) => {
    const result = await registerUser(data);
    
    if (!result.success) {
      return { success: false, message: result.message };
    }

    // Auto-login after successful registration
    const authData = await loginUser(data.email, data.password);
    if (authData) {
      saveAuthData(authData);
      return { success: true, message: 'Account created successfully' };
    }

    return { success: true, message: 'Account created. Please log in.' };
  };

  // Logout function
  const logout = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await logoutUser(refreshToken);
    }
    clearAuthData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============ HOOK ============

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}