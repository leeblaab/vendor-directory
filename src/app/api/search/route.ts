import { NextResponse } from 'next/server';
import { searchVendors } from '@/lib/directus';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Anonymous-safe search pagination endpoint.
 *
 *   GET /api/search?q=plumbing&limit=12&offset=0
 *   → { items: Vendor[], total: <filter_count> }
 *
 * Server-side only (holds DIRECTUS_API_TOKEN in env never exposed to the client).
 * Proven against api.easyfinder.ae: name + description _icontains, meta=filter_count.
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') ?? '';
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 12), 100);
    const offset = Math.max(Number(url.searchParams.get('offset') ?? 0), 0);

    const { items, total } = await searchVendors(q, limit, offset);
    return NextResponse.json({ items, total, limit, offset });
  } catch (err) {
    console.error('[/api/search]', err);
    return NextResponse.json(
      { items: [], total: 0, error: 'search_failed' },
      { status: 500 }
    );
  }
}
