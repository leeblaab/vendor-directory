'use client';

import { useCallback, useMemo, useState } from 'react';
import { Vendor, Category } from '@/lib/directus';
import VendorCard, { RatingData } from '@/components/VendorCard';
import FilterBar from '@/components/FilterBar';
import type { VendorRow } from './lib/batch';

type SortOption = 'name' | 'rating' | 'google-rating' | 'reviews';

export default function BrowseClient({
  initialVendors,
  initialRatings,
  total,
  pageSize,
  categoryId,
  categoryName,
}: {
  initialVendors: VendorRow[];
  initialRatings: Record<number, RatingData>;
  total: number;
  pageSize: number;
  categoryId: number | null;
  categoryName: string | null;
}) {
  const [loaded, setLoaded] = useState<VendorRow[]>(initialVendors);
  const [ratingsMap, setRatingsMap] = useState(initialRatings);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [minGoogleRating, setMinGoogleRating] = useState(0);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const hasMore = loaded.length < total;

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const offset = loaded.length;
      const resp = await fetch(
        `/api/browse?category=${categoryId ?? ''}&limit=${pageSize}&offset=${offset}`,
        { cache: 'no-store' }
      );
      const json = await resp.json();
      if (json.items && json.items.length) {
        setLoaded((prev) => {
          const seen = new Set(prev.map((v) => v.id));
          return [...prev, ...json.items.filter((v: VendorRow) => !seen.has(v.id))];
        });
        setRatingsMap((prev) => ({ ...prev, ...(json.ratingsMap || {}) }));
      }
    } catch (err) {
      console.error('load-more failed', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, pageSize, loaded.length]);

  // Service areas from the loaded subset (bounded, not 17k).
  const allAreas = useMemo(() => {
    const areas = new Set<string>();
    loaded.forEach((vendor) => {
      const serviceAreas = Array.isArray(vendor.service_areas) ? vendor.service_areas : [];
      serviceAreas.forEach((area) => areas.add(area));
    });
    return Array.from(areas).sort();
  }, [loaded]);

  const filteredVendors = useMemo(() => {
    let result = loaded;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) => v.name.toLowerCase().includes(q) || v.description?.toLowerCase().includes(q)
      );
    }
    if (selectedArea) {
      result = result.filter((v) =>
        Array.isArray(v.service_areas) ? v.service_areas.includes(selectedArea) : false
      );
    }
    if (minRating > 0) {
      result = result.filter((v) => (ratingsMap[v.id]?.average || 0) >= minRating);
    }
    if (minGoogleRating > 0) {
      result = result.filter((v) => (v.google_review_rating || 0) >= minGoogleRating);
    }
    if (showVerifiedOnly) result = result.filter((v) => v.verified);
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (ratingsMap[b.id]?.average || 0) - (ratingsMap[a.id]?.average || 0);
        case 'google-rating':
          return (b.google_review_rating || 0) - (a.google_review_rating || 0);
        case 'reviews':
          return (ratingsMap[b.id]?.count || 0) - (ratingsMap[a.id]?.count || 0);
        default:
          return 0;
      }
    });
    return result;
  }, [loaded, searchQuery, selectedArea, minRating, minGoogleRating, showVerifiedOnly, sortBy, ratingsMap]);

  const hasFilters =
    !!searchQuery || !!selectedArea || minRating > 0 || minGoogleRating > 0 || showVerifiedOnly;

  return (
    <div>
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        allAreas={allAreas}
        minRating={minRating}
        setMinRating={setMinRating}
        minGoogleRating={minGoogleRating}
        setMinGoogleRating={setMinGoogleRating}
        showVerifiedOnly={showVerifiedOnly}
        setShowVerifiedOnly={setShowVerifiedOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink/60">
          Showing <span className="font-semibold text-ink">{filteredVendors.length}</span> of{' '}
          <span className="font-semibold text-ink">{total.toLocaleString()}</span> providers
          {hasFilters && <span className="ml-2 text-brass">(filtered)</span>}
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedArea('');
              setMinRating(0);
              setMinGoogleRating(0);
              setShowVerifiedOnly(false);
            }}
            className="flex items-center gap-1 text-sm text-brass hover:text-brass-deep"
          >
            <span className="material-symbols-outlined text-base">clear_all</span>
            Clear filters
          </button>
        )}
      </div>

      {filteredVendors.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-bone p-12 text-center">
          <span className="material-symbols-outlined text-ink/40 text-6xl mb-4 block">
            search_off
          </span>
          <h3 className="text-lg font-semibold text-ink mb-2">No providers found</h3>
          <p className="text-ink/60">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} ratingData={ratingsMap[vendor.id]} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-bone transition hover:bg-brass disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
                Loading…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">expand_more</span>
                Show more providers
              </>
            )}
          </button>
          {!loading && (
            <p className="mt-2 text-xs text-ink/40">
              {loaded.length.toLocaleString()} of {total.toLocaleString()} loaded
            </p>
          )}
        </div>
      )}
    </div>
  );
}
