import { MetadataRoute } from 'next';
import { getAllVendors } from '@/lib/directus';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  // 1. Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/vendors`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 2. Fetch vendors
  let vendorPages: MetadataRoute.Sitemap = [];
  try {
    const vendors = await getAllVendors();
    vendorPages = vendors.map((vendor) => {
      const lastMod = vendor.date_updated || vendor.date_created || now;
      
      // ✅ CRITICAL FIX: Encode the slug to prevent XML crashes (&) and handle Arabic/special chars
      // Next.js will automatically decode this when the user visits the page.
      const encodedSlug = encodeURIComponent(vendor.slug);
      
      return {
        url: `${baseUrl}/vendors/${encodedSlug}`,
        lastModified: new Date(lastMod),
        changeFrequency: 'weekly',
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('Error fetching vendors for sitemap:', error);
  }

  return [...staticPages, ...vendorPages];
}