'use client';

import { useState, useMemo } from 'react';
import { Vendor, Category } from '@/lib/directus';
import VendorCard, { RatingData } from '@/components/VendorCard';
import FilterBar from '@/components/FilterBar';

export default function VendorList({
  vendors,
  currentCategory,
  categories,
  ratingsMap,
}: {
  vendors: (Vendor & { category: Category })[];
  currentCategory?: string;
  categories: Category[];
  ratingsMap: Record<number, RatingData | null>;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [minGoogleRating, setMinGoogleRating] = useState(0);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'google-rating' | 'reviews'>('name');

  // Extract all unique service areas
  const allAreas = useMemo(() => {
    const areas = new Set<string>();
    vendors.forEach((vendor) => {
      const serviceAreas = Array.isArray(vendor.service_areas)
        ? vendor.service_areas
        : [];
      serviceAreas.forEach((area) => areas.add(area));
    });
    return Array.from(areas).sort();
  }, [vendors]);

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let result = vendors.filter((vendor) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = vendor.name.toLowerCase().includes(query);
        const matchesDesc = vendor.description?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesDesc) return false;
      }

      // Area filter
      if (selectedArea) {
        const serviceAreas = Array.isArray(vendor.service_areas)
          ? vendor.service_areas
          : [];
        if (!serviceAreas.includes(selectedArea)) return false;
      }

      // Platform rating filter
      if (minRating > 0) {
        const vendorRating = ratingsMap[vendor.id]?.average || 0;
        if (vendorRating < minRating) return false;
      }

      // Google rating filter
      if (minGoogleRating > 0) {
        const googleRating = vendor.google_review_rating || 0;
        if (googleRating < minGoogleRating) return false;
      }

      // Verified filter
      if (showVerifiedOnly && !vendor.verified) return false;

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          const ratingA = ratingsMap[a.id]?.average || 0;
          const ratingB = ratingsMap[b.id]?.average || 0;
          return ratingB - ratingA;
        case 'google-rating':
          const googleA = a.google_review_rating || 0;
          const googleB = b.google_review_rating || 0;
          return googleB - googleA;
        case 'reviews':
          const reviewsA = ratingsMap[a.id]?.count || 0;
          const reviewsB = ratingsMap[b.id]?.count || 0;
          return reviewsB - reviewsA;
        default:
          return 0;
      }
    });

    return result;
  }, [vendors, searchQuery, selectedArea, minRating, minGoogleRating, showVerifiedOnly, sortBy, ratingsMap]);

  return (
    <div>
      {/* Filter Bar */}
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

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredVendors.length}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{vendors.length}</span> providers
        </p>
        {(searchQuery || selectedArea || minRating > 0 || minGoogleRating > 0 || showVerifiedOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedArea('');
              setMinRating(0);
              setMinGoogleRating(0);
              setShowVerifiedOnly(false);
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">clear_all</span>
            Clear filters
          </button>
        )}
      </div>

      {/* Vendor Grid */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center">
          <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-6xl mb-4 block">
            search_off
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No providers found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              ratingData={ratingsMap[vendor.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}