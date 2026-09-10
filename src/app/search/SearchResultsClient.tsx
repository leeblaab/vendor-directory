'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import VendorCard from '@/components/VendorCard';
import { Vendor, Category } from '@/lib/directus';
import { track } from '@/lib/track';

type VendorRow = Vendor & { category: Category };

interface SearchResultsClientProps {
  initialVendors: VendorRow[];
  total: number;
  query: string;
  categories: Category[];
}

type SortOption = 'verified' | 'name' | 'category';
const PAGE_SIZE = 12;

export default function SearchResultsClient({
  initialVendors,
  total,
  query,
  categories,
}: SearchResultsClientProps) {
  // Data state — grows as user clicks "Load more".
  const [loaded, setLoaded] = useState<VendorRow[]>(initialVendors);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(initialVendors.length);

  // UI state — same as before.
  const [sortBy, setSortBy] = useState<SortOption>('verified');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const hasMore = loaded.length < total;

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const offset = offsetRef.current;
      const next = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&offset=${offset}`,
        { cache: 'no-store' }
      );
      const json = await next.json();
      if (json.items && json.items.length) {
        setLoaded((prev) => [...prev, ...json.items]);
        offsetRef.current += json.items.length;
      }
    } catch (err) {
      console.error('load-more failed', err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Reset on query change (parent remounts by key, but be defensive).
  useEffect(() => {
    setLoaded(initialVendors);
    offsetRef.current = initialVendors.length;
    setSelectedCategory('');
    setVerifiedOnly(false);
    setSortBy('verified');
    // Phase 2.2: one impression per search query (parent remounts by key per query).
    // Only fire for non-empty queries — the empty-state "popular categories" landing
    // is not a search and would pollute the keyword signal.
    if (query.trim()) {
      track('search_impression', {
        search_term: query.trim(),
        results_count: total,
        has_results: initialVendors.length > 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialVendors]);

  // Filter + sort over the *loaded subset* (bounded small), not 17k.
  let filtered = [...loaded];
  if (selectedCategory) {
    filtered = filtered.filter(
      (v) => String((v.category as Category)?.id) === selectedCategory
    );
  }
  if (verifiedOnly) {
    filtered = filtered.filter((v) => v.verified);
  }
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category?.name?.localeCompare(b.category?.name || '') || 0;
      case 'verified':
      default:
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0) || a.name.localeCompare(b.name);
    }
  });

  const clearAll = () => {
    setSelectedCategory('');
    setVerifiedOnly(false);
    setSortBy('verified');
  };
  const hasActiveFilters = selectedCategory || verifiedOnly;

  return (
    <>
      {/* FILTER BAR — restyled to Gulf-ink palette */}
      <div className="rounded-2xl border border-ink/10 bg-bone p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
            <span className="material-symbols-outlined text-base">tune</span>
            Filter results
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-sm text-brass hover:text-brass-deep"
            >
              <span className="material-symbols-outlined text-base">close</span>
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Category */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-ink/60">
              <span className="material-symbols-outlined text-sm">category</span>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink transition focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Verified only */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-ink/60">
              <span className="material-symbols-outlined text-sm">verified</span>
              Verification
            </label>
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                verifiedOnly
                  ? 'border-verified/60 bg-verified-soft text-verified'
                  : 'border-ink/15 bg-white text-ink/70 hover:border-ink/30'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {verifiedOnly ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              Verified only
            </button>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-ink/60">
              <span className="material-symbols-outlined text-sm">sort</span>
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink transition focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30"
            >
              <option value="verified">Verified first</option>
              <option value="name">Name (A–Z)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* COUNT */}
      <div className="mb-4 flex items-baseline justify-between px-1">
        <p className="text-sm text-ink/60">
          Showing <strong className="text-ink">{filtered.length}</strong> of{' '}
          <strong className="text-ink">{total.toLocaleString()}</strong> results
          {hasActiveFilters && <span className="ml-2 text-brass">(filtered)</span>}
        </p>
        {hasMore && !loading && (
          <span className="hidden text-xs text-ink/40 sm:inline">
            {loaded.length} loaded so far
          </span>
        )}
      </div>

      {/* EMPTY STATE (after filters) */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-bone p-8 text-center">
          <span className="material-symbols-outlined mb-3 block text-4xl text-brass">
            filter_alt_off
          </span>
          <p className="mb-2 font-medium text-ink">No providers match your filters</p>
          <p className="mb-4 text-sm text-ink/60">
            Try changing your filters or searching something different.
          </p>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bone transition hover:bg-brass"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          {/* LOAD MORE */}
          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-bone transition hover:bg-brass disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">
                      autorenew
                    </span>
                    Loading…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">expand_more</span>
                    Show more results
                  </>
                )}
              </button>
              {!loading && (
                <p className="mt-2 text-xs text-ink/40">
                  {Math.min(loaded.length + PAGE_SIZE, total).toLocaleString()} of{' '}
                  {total.toLocaleString()} loaded
                </p>
              )}
            </div>
          )}

          {/* BROWSE ALL — always visible */}
          <div className="mt-10 text-center">
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:border-brass hover:text-brass"
            >
              <span className="material-symbols-outlined text-base">list</span>
              Browse all providers
            </Link>
          </div>
        </>
      )}
    </>
  );
}
