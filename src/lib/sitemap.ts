/**
 * Sitemap data helpers (Phase 2).
 *
 * These are ADDITIVE — they do not modify getAllVendors()/getCategories(),
 * so the search + vendors pages that import those keep working unchanged.
 *
 * Vendor rows are fetched with a dual pass:
 *   1. fields = slug,updated_at,created_at  -> real per-URL lastmod
 *   2. on HTTP 403 (the API role lacks read perm on the timestamp fields) ->
 *      fields = slug only, and lastmod is simply omitted (never faked).
 *
 * This guarantees the build never hard-fails on the 403 permission gap, and
 * Google always receives a valid urlset (either with real lastmod, or without).
 */

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';

export type SitemapVendor = {
  slug: string;
  updated_at?: string | null;
  created_at?: string | null;
};

function directusHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}` };
}

function buildVendorParams(fields: string): string {
  const params = new URLSearchParams();
  params.set('fields', fields);
  params.set('filter[status][_eq]', 'published');
  params.set('limit', '-1'); // all published vendors in one call
  params.set('sort', '[id]');
  return params.toString();
}

async function fetchVendorOnce(fields: string): Promise<Response> {
  const url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/vendors?${buildVendorParams(fields)}`;
  // sitemap.ts is a STATIC (SSG/ISR) metadata route — a default (cache) fetch is
  // built once and revalidated daily. `next.revalidate` is the Next 16 shape.
  return fetch(url, { headers: directusHeaders(), next: { revalidate: 86400 } });
}

/**
 * Published vendors' slugs (+ timestamps when the API role allows).
 * Throws on non-403 failures so callers can log a real error.
 */
export async function getSitemapVendors(): Promise<SitemapVendor[]> {
  let res = await fetchVendorOnce('slug,updated_at,created_at');

  // 403 = timestamp field(s) not permitted for this role -> retry slug-only.
  if (res.status === 403) {
    res = await fetchVendorOnce('slug');
  }

  if (!res.ok) {
    throw new Error(`sitemap: Directus vendors fetch failed (HTTP ${res.status})`);
  }

  const parsed: unknown = await res.json();
  // Directus envelope: { data: Vendor[], meta: {...} }; fall back to a bare array.
  const data = Array.isArray(parsed)
    ? parsed
    : (parsed as { data?: SitemapVendor[] }).data;
  if (!Array.isArray(data)) return [];
  return data.filter((v) => v && v.slug);
}

/**
 * Published category slugs. Fetched directly (not via getCategories(), which uses
 * cache:'no-store' and would break the static sitemap build) with dual pass:
 * try timestamps -> on 403 fall back to slug-only.
 */
export async function getSitemapCategories(): Promise<string[]> {
  const qs = 'fields=slug,updated_at,created_at&limit=-1';
  let res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories?${qs}`, {
    headers: directusHeaders(),
    next: { revalidate: 86400 },
  });
  if (res.status === 403) {
    res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories?fields=slug&limit=-1`, {
      headers: directusHeaders(),
      next: { revalidate: 86400 },
    });
  }
  if (!res.ok) {
    throw new Error(`sitemap: Directus categories fetch failed (HTTP ${res.status})`);
  }
  const parsed: unknown = await res.json();
  const data = Array.isArray(parsed)
    ? parsed
    : (parsed as { data?: { slug?: string }[] }).data;
  if (!Array.isArray(data)) return [];
  return data.map((c) => c?.slug).filter((s): s is string => Boolean(s));
}
