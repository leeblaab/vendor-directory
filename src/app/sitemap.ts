import { MetadataRoute } from 'next';
import { getAllVendors } from '@/lib/directus';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  // 1. Static pages (Added /about and /faq)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vendors`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Fetch vendors with REAL lastModified dates
  let vendorPages: MetadataRoute.Sitemap = [];
  try {
    const vendors = await getAllVendors();
    vendorPages = vendors.map((vendor) => {
      // ✅ FIX: Use the actual update date from Directus. 
      // This prevents Google from thinking every vendor changed today.
      const lastMod = vendor.date_updated || vendor.date_created || now;
      
      return {
        url: `${baseUrl}/vendors/${vendor.slug}`,
        lastModified: new Date(lastMod),
        changeFrequency: 'weekly',
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('Error fetching vendors for sitemap:', error);
  }

  // Note: We intentionally exclude category filter URLs (e.g., /vendors?category=plumbers)
  // from the sitemap. Search engines prefer clean, canonical URLs, and query parameters 
  // are just client-side filters on the main /vendors page.

  return [...staticPages, ...vendorPages];
}