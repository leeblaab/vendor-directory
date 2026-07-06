'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setIsMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '?';
    const first = user.first_name?.charAt(0) || '';
    const last = user.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?';
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home', icon: 'home' },
    { href: '/vendors', label: 'Browse Services', icon: 'storefront' },
    { href: '/about', label: 'About', icon: 'info' },
    { href: '/contact', label: 'Contact', icon: 'mail' },
    { href: '/faq', label: 'FAQ', icon: 'help' },
  ];

  // Helper to check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* ============ LEFT: LOGO ============ */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-white text-xl">search</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                ServiceFinder
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5 leading-tight">UAE</div>
            </div>
          </Link>

          {/* ============ CENTER: NAV LINKS (Desktop only) ============ */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ============ RIGHT: SUBMIT + AUTH + MOBILE MENU ============ */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Loading State */}
            {isLoading && (
              <div className="w-24 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
            )}

            {/* Submit Vendor Button - Visible to ALL users (desktop) */}
            {!isLoading && (
              <Link
                href="/submit"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add_business</span>
                Submit Vendor
              </Link>
            )}

            {/* Logged Out State */}
            {!isLoading && !isAuthenticated && (
              <>
                {/* Login Button */}
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  Sign In
                </Link>

                {/* Register Button */}
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  <span className="hidden sm:inline">Register</span>
                  <span className="sm:hidden">Sign Up</span>
                </Link>
              </>
            )}

            {/* Logged In State */}
            {!isLoading && isAuthenticated && user && (
              <>
                {/* Mobile Submit Button (icon only) */}
                <Link
                  href="/submit"
                  className="md:hidden inline-flex items-center justify-center w-9 h-9 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
                  title="Submit Vendor"
                >
                  <span className="material-symbols-outlined text-lg">add_business</span>
                </Link>

                {/* User Menu Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                      {getUserInitials()}
                    </div>
                    
                    {/* User Name (desktop only) */}
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                        {user.first_name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight max-w-[120px] truncate">
                        {user.email}
                      </div>
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <span 
                      className={`material-symbols-outlined text-gray-400 transition-transform hidden sm:block ${
                        isMenuOpen ? 'rotate-180' : ''
                      }`}
                      style={{ fontSize: '18px' }}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                        >
                          <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>
                            person
                          </span>
                          My Account
                          <span className="ml-auto text-xs text-gray-400 italic">Coming soon</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                        >
                          <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>
                            list_alt
                          </span>
                          My Submissions
                          <span className="ml-auto text-xs text-gray-400 italic">Coming soon</span>
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left disabled:opacity-50"
                      >
                        {isLoggingOut ? (
                          <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>
                            progress_activity
                          </span>
                        ) : (
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                            logout
                          </span>
                        )}
                        {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden" ref={mobileMenuRef}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center w-9 h-9 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>

              {/* Mobile Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive(link.href)
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>
                          {link.icon}
                        </span>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    ))}
                    
                    {/* Mobile-only: Submit Vendor link (for logged out users) */}
                    {!isAuthenticated && (
                      <Link
                        href="/submit"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                          add_business
                        </span>
                        <span className="font-medium">Submit Vendor</span>
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}