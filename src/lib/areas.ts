// Area index for /areas landing pages (Phase C.1, 2026-11-23).
// service_areas is a `json` field in Directus → LIKE/_icontains filters are
// rejected by the API ("json field type does not contain the _icontains
// operator"). So we derive everything client-side from one full vendor fetch
// (same fetch the sitemap already does) and SSG the gated area pages.
import { getAllVendors, Vendor, Category, isUsableSlug } from './directus';

export type AreaEntry = {
  slug: string;
  displayName: string;
  count: number;
  vendors: (Vendor & { category: Category })[]; // top 12, best-first
  topCategories: { name: string; slug: string; count: number }[];
};

// Our own gate: never build an area page thinner than this — a page with
// fewer vendors than this is exactly the thin doorway content that got the
// site deindexed. 131 areas clear it (audit 2026-11-23).
export const MIN_AREA_VENDORS = 10;
export const AREA_PAGE_TOP_N = 12;

// service_areas comes back as string[] (json field) but legacy rows may hold
// a JSON-encoded string or double-encoded junk like `[""ajman""]`.
function parseAreaValues(raw: unknown): string[] {
  let arr: unknown = raw;
  if (typeof raw === 'string') {
    try {
      arr = JSON.parse(raw);
    } catch {
      arr = [raw];
    }
  }
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => (typeof x === 'string' ? x : '')).filter(Boolean);
}

// Normalize one raw area token: strip brackets/quotes, collapse spaces.
// Returns '' for junk (empty, single char, block codes like "e19 02").
export function normalizeArea(raw: string): string {
  let s = raw.trim();
  // peel repeated wrapping like ["..."] or ""..."" left by double-encoding
  for (let i = 0; i < 3; i++) {
    const peeled = s.replace(/^\[+/, '').replace(/\]+$/, '').replace(/^"+|"+$/g, '').trim();
    if (peeled === s) break;
    s = peeled;
  }
  s = s.replace(/\s+/g, ' ');
  if (s.length < 2 || s.length > 60) return '';
  // block/plot codes: "e19 02", "d05 1541", "10173" — not navigable areas
  if (/^[a-z]?\d[\d\s-]*$/i.test(s)) return '';
  return s;
}

export function areaSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/["'[\]()/.,&]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function titleCase(s: string): string {
  // Arabic and other non-Latin scripts are returned unchanged.
  return s
    .split(' ')
    .map((w) => (/^[a-z]/.test(w) ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

type Cache = {
  index: Map<string, {
    slug: string;
    counts: Map<string, number>; // normalized display variants → freq
    vendors: (Vendor & { category: Category })[];
  }> | null;
};
const g = globalThis as unknown as { __efAreaCache?: Cache };
if (!g.__efAreaCache) g.__efAreaCache = { index: null };

async function buildIndex(prefetched?: (Vendor & { category: Category })[]) {
  if (g.__efAreaCache!.index) return g.__efAreaCache!.index;
  const vendors = prefetched ?? (await getAllVendors());
  const index = new Map<string, {
    slug: string;
    counts: Map<string, number>;
    vendors: (Vendor & { category: Category })[];
  }>();
  for (const v of vendors) {
    if (!isUsableSlug(v.slug)) continue;
    const seen = new Set<string>(); // one slot per vendor per area
    for (const raw of parseAreaValues(v.service_areas as unknown)) {
      const norm = normalizeArea(raw);
      if (!norm) continue;
      const slug = areaSlug(norm);
      if (!slug || slug === '-') continue;
      if (seen.has(slug)) continue;
      seen.add(slug);
      let slot = index.get(slug);
      if (!slot) {
        slot = { slug, counts: new Map(), vendors: [] };
        index.set(slug, slot);
      }
      // keep the clean display variants with frequency (best-cased wins later)
      slot.counts.set(norm, (slot.counts.get(norm) || 0) + 1);
      slot.vendors.push(v);
    }
  }
  g.__efAreaCache!.index = index;
  return index;
}

function rankAreaEntry(
  slot: { slug: string; counts: Map<string, number>; vendors: (Vendor & { category: Category })[] },
): AreaEntry {
  // display name: most frequent clean variant; prefer one starting uppercase
  const variants = [...slot.counts.entries()];
  const niceFirst = variants
    .filter(([v]) => /^[\p{Lu}\p{Script=Arabic}]/u.test(v))
    .sort((a, b) => b[1] - a[1]);
  const picked = niceFirst[0]?.[0] || variants.sort((a, b) => b[1] - a[1])[0]?.[0] || slot.slug;
  const displayName = titleCase(picked);
  const sorted = [...slot.vendors].sort(
    (a, b) =>
      Number(b.verified) - Number(a.verified) ||
      (b.google_review_rating ?? 0) - (a.google_review_rating ?? 0) ||
      a.name.localeCompare(b.name),
  );
  const catCounts = new Map<string, { name: string; slug: string; count: number }>();
  for (const v of slot.vendors) {
    const c = v.category;
    if (!c?.slug) continue;
    const cur = catCounts.get(c.slug);
    if (cur) cur.count++;
    else catCounts.set(c.slug, { name: c.name, slug: c.slug, count: 1 });
  }
  return {
    slug: slot.slug,
    displayName,
    count: slot.vendors.length,
    vendors: sorted.slice(0, AREA_PAGE_TOP_N),
    topCategories: [...catCounts.values()].sort((a, b) => b.count - a.count).slice(0, 8),
  };
}

export async function getGatedAreas(
  prefetched?: (Vendor & { category: Category })[],
): Promise<AreaEntry[]> {
  const index = await buildIndex(prefetched);
  return [...index.values()]
    .filter((s) => s.vendors.length >= MIN_AREA_VENDORS)
    .map(rankAreaEntry)
    .sort((a, b) => b.count - a.count || a.displayName.localeCompare(b.displayName));
}

export async function getAreaBySlug(slug: string): Promise<AreaEntry | null> {
  const index = await buildIndex();
  const slot = index.get(slug);
  if (!slot || slot.vendors.length < MIN_AREA_VENDORS) return null;
  return rankAreaEntry(slot);
}
