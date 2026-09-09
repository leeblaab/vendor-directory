import { NextResponse } from 'next/server';
import { getVendorsBrowsePage } from '@/lib/directus';
import { buildBatchRatings } from '@/app/vendors/lib/batch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Anonymous-safe browse pagination endpoint for /vendors.
 *
 *   GET /api/browse?category=<id-or-slug>&limit=12&offset=0
 *   → { items, total, ratingsMap }
 *
 * `category` accepts a numeric Directus id OR a category slug (the site's
 * `/vendors?category=…` links all use slugs, e.g. `plumbing`). The lib resolves
 * slugs server-side via a `_sub_query` (anonymous API can't filter on
 * `category.slug` directly). Proven against api.easyfinder.ae.
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categoryIdRaw = url.searchParams.get('category')?.trim() ?? '';
    const categoryId =
      categoryIdRaw && /^\d+$/.test(categoryIdRaw)
        ? Number(categoryIdRaw)
        : null;
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 12), 100);
    const offset = Math.max(Number(url.searchParams.get('offset') ?? 0), 0);

    const { items, total } = await getVendorsBrowsePage(categoryId, limit, offset);
    const ratingsMap = await buildBatchRatings(items);
    return NextResponse.json({ items, total, limit, offset, ratingsMap });
  } catch (err) {
    console.error('[/api/browse]', err);
    return NextResponse.json(
      { items: [], total: 0, error: 'browse_failed' },
      { status: 500 }
    );
  }
}
