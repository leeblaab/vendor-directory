import { MetadataRoute } from 'next';
import { getAllVendors, getCategories } from '@/lib/directus';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  // Static pages
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
  ];

  // Fetch categories
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryPages = categories.map((category) => ({
      url: `${baseUrl}/vendors?category=${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  // Fetch vendors
  let vendorPages: MetadataRoute.Sitemap = [];
  try {
    const vendors = await getAllVendors();
    vendorPages = vendors.map((vendor) => ({
      url: `${baseUrl}/vendors/${vendor.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching vendors for sitemap:', error);
  }

  return [...staticPages, ...categoryPages, ...vendorPages];
}