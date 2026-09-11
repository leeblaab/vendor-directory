import { MetadataRoute } from 'next';
import { getAllVendors, getCategories } from '@/lib/directus';

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

  // 1b. Categories (index + one landing page per category)
  let categoryPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
  ];
  try {
    const categories = await getCategories();
    categoryPages = [
      ...categoryPages,
      ...categories.map(
        (c): MetadataRoute.Sitemap[number] => ({
          url: `${baseUrl}/categories/${c.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
        })
      ),
    ];
  } catch (e) {
    console.error('sitemap: categories fetch failed', e);
  }

  // 2. Fetch vendors
  let vendorPages: MetadataRoute.Sitemap = [];
  try {
    const vendors = await getAllVendors();
    vendorPages = vendors.map((vendor) => {
      // GSC requires W3C/ISO-8601 dates WITH a timezone designator (Z/offset).
      // Directus returns naive strings like "2026-08-24T10:00:00" → GSC rejects them.
      const toISO = (v: unknown): string => {
        if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString();
        if (typeof v === 'string' && v) {
          const d = new Date(v);
          if (!isNaN(d.getTime())) return d.toISOString();
        }
        return now.toISOString();
      };
      const lastMod = toISO(vendor.date_updated ?? vendor.date_created);
      
      // ✅ Encode the slug to prevent XML crashes (&) and handle Arabic/special chars
      // Next.js will automatically decode this when the user visits the page.
      const encodedSlug = encodeURIComponent(vendor.slug);

      return {
        url: `${baseUrl}/vendors/${encodedSlug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('Error fetching vendors for sitemap:', error);
  }

  return [...staticPages, ...categoryPages, ...vendorPages];
}