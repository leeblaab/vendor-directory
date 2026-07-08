import { createDirectus, rest, readItems, createItem, authentication } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const proxyUrl = '/api/directus';

if (!directusUrl) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_URL environment variable is not set');
}

// Updated client with authentication support
export const directus = createDirectus(directusUrl)
  .with(authentication('json'))
  .with(rest());

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  category_image: {  // ✅ NEW: Add this field
    id: string;
    filename_disk: string;
  } | null;
};

export type Vendor = {
  id: number;
  name: string;
  slug: string;
  category: Category | number;
  phone: string;
  whatsapp_link: string;
  website: string;
  email: string;
  logo: { id: string; filename_download?: string } | string | null;
  service_areas: string[] | string;
  description: string;
  notes: string;
  verified: boolean;
  status: 'draft' | 'published' | 'pending';
  latitude: number | null;    // ← NEW
  longitude: number | null;   // ← NEW
  date_created?: string; // ✅ ADD THIS
  date_updated?: string; // ✅ ADD THIS
};

// ============ USER TYPES ============

export type AppUser = {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires: number;
  user: AppUser;
};

// Standard fields to fetch for vendor queries
const VENDOR_FIELDS = [
  '*',
  'category.id',
  'category.name',
  'category.slug',
  'category.icon',
  'logo.id',
  'logo.filename_download',
];

export type Review = {
  id: string;
  vendor: number | { id: number; name: string };
  user: string | { id: string; first_name: string; last_name: string };
  rating: number;
  comment: string;
  status: 'draft' | 'published' | 'pending';
  created_at: string;
  helpful_count?: number;
};

export type ReviewVote = {
  id: string;
  review: string | { id: string };
  user: string | { id: string };
  vote_type: 'up' | 'down';
  created_at: string;
};

// Helper function to get logo URL from vendor - NOW USES PROXY
export function getLogoUrl(logo: Vendor['logo']): string | null {
  if (!logo) return null;
  
  if (typeof logo === 'string') {
    // If it's already a full URL, use it; otherwise proxy it
    return logo.startsWith('http') ? logo : `/api/directus/assets/${logo}`;
  }
  
  if (typeof logo === 'object' && logo.id) {
    // ✅ FIXED: Use proxy URL instead of direct Directus URL
    return `/api/directus/assets/${logo.id}`;
  }
  
  return null;
}

// ============ CATEGORY FUNCTIONS ============

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories?fields=id,name,slug,icon,category_image.id,category_image.filename_disk&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
        },
        cache: 'no-store'
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch categories');
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// ============ VENDOR FUNCTIONS ============

export async function getAllVendors(): Promise<(Vendor & { category: Category })[]> {
  try {
    const vendors = await directus.request<(Vendor & { category: Category })[]>(
      readItems('vendors', {
        filter: { status: { _eq: 'published' } },
        fields: VENDOR_FIELDS,
        limit: -1,
        sort: ['name'],
      })
    );
    return vendors || [];
  } catch (error) {
    console.error('Error fetching vendors from Directus:', error);
    throw new Error('Failed to fetch vendors');
  }
}

export async function getVendorsPaginated(limit: number = 12): Promise<(Vendor & { category: Category })[]> {
  try {
    const vendors = await directus.request<(Vendor & { category: Category })[]>(
      readItems('vendors', {
        filter: { status: { _eq: 'published' } },
        fields: VENDOR_FIELDS,
        limit,
        sort: ['name'],
      })
    );
    return vendors || [];
  } catch (error) {
    console.error('Error fetching paginated vendors from Directus:', error);
    throw new Error('Failed to fetch vendors');
  }
}

export async function getVendorBySlug(slug: string): Promise<(Vendor & { category: Category }) | null> {
  try {
    // Decode URL-encoded characters (emojis, Arabic text, etc.)
    const decodedSlug = decodeURIComponent(slug);
    
    console.log('🔍 Looking for slug:', { encoded: slug, decoded: decodedSlug });
    
    const vendors = await directus.request<(Vendor & { category: Category })[]>(
      readItems('vendors', {
        filter: { 
          slug: { _eq: decodedSlug },
          status: { _eq: 'published' } 
        },
        fields: VENDOR_FIELDS,
        limit: 1,
      })
    );
    return vendors?.[0] || null;
  } catch (error) {
    console.error(`Error fetching vendor with slug "${slug}" from Directus:`, error);
    return null;
  }
}

export async function getVendorById(id: number): Promise<(Vendor & { category: Category }) | null> {
  try {
    const vendors = await directus.request<(Vendor & { category: Category })[]>(
      readItems('vendors', {
        filter: { id: { _eq: id }, status: { _eq: 'published' } },
        fields: VENDOR_FIELDS,
        limit: 1,
      })
    );
    return vendors?.[0] || null;
  } catch (error) {
    console.error(`Error fetching vendor with ID "${id}" from Directus:`, error);
    return null;
  }
}

export async function getVendorsByCategory(categorySlug: string): Promise<(Vendor & { category: Category })[]> {
  try {
    const allVendors = await directus.request<(Vendor & { category: Category })[]>(
      readItems('vendors', {
        filter: { status: { _eq: 'published' } },
        fields: VENDOR_FIELDS,
        limit: -1,
        sort: ['name'],
      })
    );
    
    const filteredVendors = (allVendors || []).filter(
      vendor => vendor.category && 'slug' in vendor.category && vendor.category.slug === categorySlug
    );
    
    return filteredVendors;
  } catch (error) {
    console.error(`Error fetching vendors for category "${categorySlug}" from Directus:`, error);
    throw new Error('Failed to fetch vendors for category');
  }
}

export async function getRelatedVendors(
  currentSlug: string,
  categoryId: number | string,
  limit: number = 3
): Promise<(Vendor & { category: Category })[]> {
  try {
    const vendors = await directus.request<(Vendor & { category: Category })[]>(
      readItems('vendors', {
        filter: {
          category: { _eq: categoryId },
          slug: { _neq: currentSlug },
          status: { _eq: 'published' },
        },
        fields: [
          'id',
          'name',
          'slug',
          'logo.id',
          'logo.filename_download',
          'verified',
          'service_areas',
          'category.name',
          'category.icon',
        ],
        limit,
        sort: ['-verified', 'name'],
      })
    );
    return vendors || [];
  } catch (error) {
    console.error(`Error fetching related vendors for category "${categoryId}" from Directus:`, error);
    return [];
  }
}

// ============ AUTH FUNCTIONS (Using Proxy to bypass CORS) ============

export async function registerUser(data: {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
}): Promise<{ success: boolean; message: string; user?: AppUser }> {
  try {
    const response = await fetch(`${proxyUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name || '',
        status: 'active',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Registration error:', error);
      
      if (error.errors?.[0]?.extensions?.code === 'RECORD_NOT_UNIQUE') {
        return { success: false, message: 'An account with this email already exists' };
      }
      if (error.errors?.[0]?.extensions?.code === 'FORBIDDEN') {
        return { success: false, message: 'Registration is not allowed. Please contact support.' };
      }
      return { 
        success: false, 
        message: error?.errors?.[0]?.message || 'Failed to create account' 
      };
    }

    const result = await response.json();
    return { success: true, message: 'Account created', user: result.data as AppUser };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to create account. Please try again.' };
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse | null> {
  try {
    const response = await fetch(`${proxyUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Login error:', error);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function getCurrentUser(token: string): Promise<AppUser | null> {
  try {
    const response = await fetch(`${proxyUrl}/users/me?fields=*`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function refreshAuthToken(refreshToken: string): Promise<AuthResponse | null> {
  try {
    const response = await fetch(`${proxyUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken, mode: 'json' }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
}

export async function logoutUser(refreshToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${proxyUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    return response.ok;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}

export async function submitVendor(
  token: string,
  vendorData: {
    name: string;
    category: number;
    phone: string;
    whatsapp_link?: string;
    website?: string;
    email?: string;
    description: string;
    service_areas: string[];
    notes?: string;
  }
): Promise<{ success: boolean; message: string; vendor?: any }> {
  try {
    const slug = vendorData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now().toString(36);

    // Use proxy URL instead of direct Directus URL
    const response = await fetch(`${proxyUrl}/items/vendors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...vendorData,
        slug,
        status: 'draft',
        verified: false,
        service_areas: JSON.stringify(vendorData.service_areas),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Submit vendor error:', error);
      return { 
        success: false, 
        message: error?.errors?.[0]?.message || 'Failed to submit vendor' 
      };
    }

    const data = await response.json();
    return { success: true, message: 'Vendor submitted for review', vendor: data.data };
  } catch (error: any) {
    console.error('Submit vendor error:', error);
    return { 
      success: false, 
      message: error?.message || 'Failed to submit vendor' 
    };
  }
}

// ============ REVIEW FUNCTIONS ============

export async function getReviewsByVendor(vendorId: number): Promise<Review[]> {
  try {
    // Use Directus SDK for server-side calls (more reliable than fetch)
    const reviews = await directus.request<Review[]>(
      readItems('reviews', {
        filter: {
          vendor: { _eq: vendorId },
          status: { _eq: 'published' },
        },
        fields: [
          'id',
          'rating',
          'comment',
          'status',
          'created_at',
          'user.id',
          'user.first_name',
          'user.last_name',
          'helpful_count',
        ],
        sort: ['-created_at'],
      })
    );

    return reviews || [];
  } catch (error: any) {
    // 🔧 UPDATED: Extract the actual error message from the Directus SDK
    const directusError = error?.errors?.[0]?.message || error?.message || JSON.stringify(error);
    console.error(`❌ Error fetching reviews for vendor ${vendorId}:`, directusError);
    return [];
  }
}

export async function getVendorAverageRating(vendorId: number): Promise<{
  average: number;
  count: number;
} | null> {
  try {
    const reviews = await getReviewsByVendor(vendorId);
    
    if (reviews.length === 0) return null;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;

    return {
      average: Math.round(average * 10) / 10,
      count: reviews.length,
    };
  } catch (error: any) {
    // 🔧 UPDATED: Extract the actual error message
    const directusError = error?.errors?.[0]?.message || error?.message || JSON.stringify(error);
    console.error('❌ Error calculating average rating:', directusError);
    return null;
  }
}
// ============ BULK REVIEW FUNCTIONS (Prevents N+1 Server Freeze) ============

export async function getReviewsForVendors(vendorIds: number[]): Promise<Pick<Review, 'id' | 'rating' | 'vendor'>[]> {
  if (vendorIds.length === 0) return [];
  
  // Chunk IDs to avoid URL length limits in Directus GET requests
  const chunkSize = 100;
  const chunks = [];
  for (let i = 0; i < vendorIds.length; i += chunkSize) {
    chunks.push(vendorIds.slice(i, i + chunkSize));
  }

  try {
    // Fetch all reviews for these vendors in parallel chunks
    const results = await Promise.all(
      chunks.map(async (chunk) => {
        const reviews = await directus.request<Pick<Review, 'id' | 'rating' | 'vendor'>[]>(
          readItems('reviews', {
            filter: {
              vendor: { _in: chunk },
              status: { _eq: 'published' },
            },
            fields: ['id', 'rating', 'vendor'],
            limit: -1, // Fetch all matching reviews
          })
        );
        return reviews || [];
      })
    );
    
    // Flatten the chunked results into a single array
    return results.flat();
  } catch (error: any) {
    const directusError = error?.errors?.[0]?.message || error?.message || JSON.stringify(error);
    console.error('❌ Error fetching reviews for multiple vendors:', directusError);
    return [];
  }
}

// Client-side functions (use proxy)
export async function submitReviewClient(
  token: string,
  reviewData: {
    vendor: number;
    user: string;
    rating: number;
    comment: string;
  }
): Promise<{ success: boolean; message: string; review?: Review }> {
  try {
    const url = `/api/directus/items/reviews`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...reviewData,
        status: 'pending',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error?.errors?.[0]?.message || 'Failed to submit review',
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Review submitted for approval',
      review: data.data,
    };
  } catch (error: any) {
    console.error('Submit review error:', error);
    return {
      success: false,
      message: 'Failed to submit review. Please try again.',
    };
  }
}

export async function voteReviewClient(
  token: string,
  reviewId: string,
  userId: string,
  voteType: 'up' | 'down'
): Promise<{ success: boolean; message: string }> {
  try {
    const params = new URLSearchParams({
      filter: JSON.stringify({
        review: { _eq: reviewId },
        user: { _eq: userId },
      }),
      fields: 'id,vote_type',
    });

    const url = `/api/directus/items/review_votes?${params.toString()}`;

    const existingVote = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const existingData = await existingVote.json();
    
    if (existingData.data && existingData.data.length > 0) {
      const currentVote = existingData.data[0];
      
      if (currentVote.vote_type === voteType) {
        const deleteResponse = await fetch(
          `/api/directus/items/review_votes/${currentVote.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        return {
          success: deleteResponse.ok,
          message: deleteResponse.ok ? 'Vote removed' : 'Failed to remove vote',
        };
      } else {
        const updateResponse = await fetch(
          `/api/directus/items/review_votes/${currentVote.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ vote_type: voteType }),
          }
        );
        
        return {
          success: updateResponse.ok,
          message: updateResponse.ok ? 'Vote updated' : 'Failed to update vote',
        };
      }
    } else {
      const response = await fetch(`/api/directus/items/review_votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review: reviewId,
          user: userId,
          vote_type: voteType,
        }),
      });

      return {
        success: response.ok,
        message: response.ok ? 'Vote recorded' : 'Failed to record vote',
      };
    }
  } catch (error: any) {
    console.error('Vote review error:', error);
    return {
      success: false,
      message: 'Failed to vote. Please try again.',
    };
  }
}