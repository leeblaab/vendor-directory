/**
 * Sitemap data helpers (Phase 2 — v3, 2026-09-07).
 *
 * LIVE-API AUDIT (api.easyfinder.ae, token role, repeated 3x each):
 *
 *   200 : vendors fields=id,slug&filter[status][_eq]=published&limit=-1&sort=name  (~927 KB)
 *   200 : categories fields=slug&limit=-1&sort=name
 *   403 : anything selecting updated_at / created_at
 *         "You don't have permission to access fields \"updated_at\", \"created_at\""
 *   403 : sort=[id]           "…access field \"[id]\""
 *   403 : categories filter[status]  (token has no read on categories.status)
 *
 * ROOT CAUSE of "live sitemap has categories but zero vendors": the v1
 * code used sort=[id] in BOTH passes → both 403 → getSitemapVendors
 * threw → Promise.allSettled swallows it → 0 vendor URLs. Categories
 * worked (no sort/filter in that query) → they survived. Exactly the
 * shape of the reported live bug (8 core + 60 categories + 0 vendors).
 *
 * v3 strategy:
 *   - WIDE pass  : id,slug,updated_at,created_at → real lastmod. 403s
 *     today; starts working the moment the role is granted read on the
 *     two timestamp fields (the Directus-side fix).
 *   - SAFE pass  : id,slug → proven 200. Vendor URLs ALWAYS ship.
 *     Omitting lastmod is valid sitemap XML — never faked.
 *   - Build safety: a Directus outage still throws, but only after BOTH
 *     shapes failed (i.e. Directus is really down) — so the build fails
 *     loudly rather than silently shipping a vendor-less sitemap.
 */

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';

export type SitemapVendor = {
  slug: string;
  updated_at?: string | null;
  created_at?: string | null;
};

function authHeaders(): Record<string, string> {
  const token = process.env.DIRECTUS_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface Envelope<T> {
  data?: T[];
}

/**
 * Fetch with retries for transient (5xx / network) failures. 4xx are
 * authoritative permission answers — return immediately, no hammering.
 * Network errors are swallowed and reported via `ok:false` so callers
 * can fall back to a different shape.
 */
async function directusGet(url: string, attempts = 3): Promise<Response> {
  const fail: Response = new Response('request failed', { status: 0 });
  let res: Response = fail;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      res = await fetch(url, {
        headers: authHeaders(),
        next: { revalidate: 86400 },
      });
    } catch {
      res = fail; // network error → keep last state, retry
    }
    if (res.ok) return res;
    if (res.status >= 400 && res.status < 500) return res; // 403 = definitive
    await new Promise((r) => setTimeout(r, 2500 * (attempt + 1)));
  }
  return res;
}

/** Fetch one vendor shape. Returns null (not throw) on any failure so
 *  the caller can try the next-safe shape. */
async function fetchVendorShape(fields: string[]): Promise<SitemapVendor[] | null> {
  const base = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/vendors`;
  const params = new URLSearchParams();
  params.set('fields', fields.join(','));
  params.set('filter[status][_eq]', 'published');
  params.set('limit', '-1');
  params.set('sort', 'name');
  const res = await directusGet(`${base}?${params.toString()}`);
  if (!res.ok) return null;
  const parsed: unknown = await res.json();
  const data = Array.isArray(parsed)
    ? parsed
    : (parsed as Envelope<SitemapVendor>).data;
  if (!Array.isArray(data)) return [];
  const rows = data.filter((v) => v && v.slug);
  return rows.length > 0 ? rows : null;
}

export async function getSitemapVendors(): Promise<SitemapVendor[]> {
  // Pass 1 — timestamps for a real lastmod (403s until the Directus
  // role is granted read on updated_at / created_at — the pending
  // Directus-schema / permission fix).
  const withTimestamps = await fetchVendorShape([
    'id',
    'slug',
    'updated_at',
    'created_at',
  ]);
  if (withTimestamps) return withTimestamps;

  // Pass 2 — proven-safe shape: vendor URLs always ship, lastmod
  // omitted (valid sitemap XML, never fabricated).
  const safe = await fetchVendorShape(['id', 'slug']);
  if (safe) return safe;

  // Both shapes failed — Directus is down or the token lost read on
  // vendors entirely. Fail loudly: better for Vercel to roll back than
  // to silently serve a sitemap with zero vendor URLs.
  throw new Error(
    'sitemap: could not read published vendors from Directus — ' +
      'both the timestamp and slug-only queries failed. ' +
      'Check api.easyfinder.ae availability and the token’s vendors read permission.'
  );
}

export async function getSitemapCategories(): Promise<string[]> {
  const base = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories`;
  // Proven-safe query for this role (no status filter — that field 403s).
  const res = await directusGet(`${base}?fields=slug&limit=-1&sort=name`);
  if (!res.ok) {
    throw new Error(
      `sitemap: could not read categories from Directus (HTTP ${res.status})`
    );
  }
  const parsed: unknown = await res.json();
  const data = Array.isArray(parsed)
    ? parsed
    : (parsed as Envelope<{ slug?: string }>).data;
  if (!Array.isArray(data)) return [];
  return data.map((c) => c?.slug).filter((s): s is string => Boolean(s));
}
