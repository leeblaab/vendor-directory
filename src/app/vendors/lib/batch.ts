import {
  getVendorsBrowsePage,
  getReviewsForVendors,
  Vendor,
  Category,
  VendorSearchPage,
} from '@/lib/directus';
import { RatingData } from '@/components/VendorCard';

export type VendorRow = Vendor & { category: Category };

/** Site-review (1–5) stats for one batch of vendors. Empty → {} = no ratings. */
export async function buildBatchRatings(
  vendors: VendorRow[]
): Promise<Record<number, RatingData>> {
  const map: Record<number, RatingData> = {};
  if (vendors.length === 0) return map;
  try {
    const reviews = await getReviewsForVendors(vendors.map((v) => v.id));
    const byVendor: Record<number, number[]> = {};
    for (const review of reviews) {
      const vId =
        typeof review.vendor === 'object' ? review.vendor.id : review.vendor;
      if (!byVendor[vId]) byVendor[vId] = [];
      byVendor[vId].push(review.rating);
    }
    for (const vendor of vendors) {
      const ratings = byVendor[vendor.id] || [];
      if (ratings.length === 0) {
        map[vendor.id] = null;
      } else {
        const sum = ratings.reduce((acc, r) => acc + r, 0);
        map[vendor.id] = {
          average: Math.round((sum / ratings.length) * 10) / 10,
          count: ratings.length,
        };
      }
    }
  } catch (err) {
    console.error('Failed to load batch ratings:', err);
  }
  return map;
}

/**
 * Fetch one page of vendors + site-review ratings for just that batch.
 * Used by the page (initial 12) and BrowseClient (each "Load more").
 */
export async function fetchVendorBatch(
  categoryId: number | null,
  pageSize: number,
  offset: number
): Promise<{ items: VendorRow[]; total: number; map: Record<number, RatingData> }> {
  const page: VendorSearchPage = await getVendorsBrowsePage(
    categoryId,
    pageSize,
    offset
  );
  const map = await buildBatchRatings(page.items);
  return { items: page.items, total: page.total, map };
}
