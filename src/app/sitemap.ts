import type { MetadataRoute } from 'next';
import {
  getSitemapVendors,
  getSitemapCategories,
  SITE_URL,
} from '@/lib/sitemap';

/**
 * Phase 2 — flat sitemap (single /sitemap.xml, <urlset>).
 *
 * Structure rationale (verified against Next 16.2.9 sources this session):
 *   - The native generateSitemaps API only registers /sitemap/<id>.xml children
 *     and leaves /sitemap.xml unresolved (404) — Next emits no <sitemapindex>.
 *   - A hand-rolled /sitemap.xml/route.ts conflicts with the sitemap.ts metadata
 *     route at the same path (build error) when both use the same app dir.
 *   - With ~17k URLs (< 50k single-sitemap Google limit) a single flat file is
 *     the clean, canonical choice and is what the LIVE site already serves.
 *   - Result: one fetchable, valid /sitemap.xml — strictly better than a
 *     children structure whose index 404s for Google.
 *
 * lastmod policy (honest; never fabricates a per-URL freshness signal):
 *   - vendors + categories: real updated_at/created_at when the API role allows
 *     (200); omitted entirely when Directus 403s the timestamp fields (valid).
 *   - core pages (home/about/faq/contact/submit/search/categories): omitted —
 *     these are static and a build-time stamp would be a false freshness signal.
 *     Omitting lastmod is valid sitemap XML and is exactly what a site whose
 *     content hasn't changed should report.
 *
 * priority + changefreq per the Phase 2 spec:
 *   - core:      1.0 / daily
 *   - categories: 0.9 / weekly
 *   - vendors:   0.6 / weekly
 */

type CoreEntry = {
  url: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const CORE_ENTRIES: CoreEntry[] = [
  { url: SITE_URL, priority: 1.0, changeFrequency: 'daily' },
  { url: `${SITE_URL}/vendors`, priority: 1.0, changeFrequency: 'daily' },
  { url: `${SITE_URL}/categories`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/search`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/faq`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/submit`, priority: 0.6, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch in parallel; catch so a Directus outage / 403 never hard-fails the build.
  let vendors: Awaited<ReturnType<typeof getSitemapVendors>> = [];
  let categorySlugs: string[] = [];
  const [vRes, cRes] = await Promise.allSettled([
    getSitemapVendors(),
    getSitemapCategories(),
  ]);
  if (vRes.status === 'fulfilled') vendors = vRes.value;
  else console.error('sitemap(vendors):', vRes.reason);
  if (cRes.status === 'fulfilled') categorySlugs = cRes.value;
  else console.error('sitemap(categories):', cRes.reason);

  const result: MetadataRoute.Sitemap = [
    ...CORE_ENTRIES.map((e) => ({
      url: e.url,
      priority: e.priority,
      changeFrequency: e.changeFrequency,
    })),
    ...categorySlugs.map((slug) => ({
      url: `${SITE_URL}/vendors?category=${encodeURIComponent(slug)}`,
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    })),
    ...vendors.map((v) => ({
      url: `${SITE_URL}/vendors/${encodeURIComponent(v.slug)}`,
      // Real timestamp only — omitted (not faked) when the API role 403s it.
      ...(v.updated_at || v.created_at
        ? { lastModified: new Date(v.updated_at ?? v.created_at!) }
        : {}),
      priority: 0.6,
      changeFrequency: 'weekly' as const,
    })),
  ];

  return result;
}
