'use client';

import { useState, useMemo } from 'react';
import VendorCard from '@/components/VendorCard';
import Link from 'next/link';
import { Vendor, Category } from '@/lib/directus';

interface SearchResultsClientProps {
  vendors: (Vendor & { category: Category })[];
  categories: Category[];
  searchQuery: string;
}

type SortOption = 'name' | 'verified' | 'category';

export default function SearchResultsClient({
  vendors,
  categories,
  searchQuery,
}: SearchResultsClientProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('verified');

  // Extract unique locations from service_areas
  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    vendors.forEach((vendor) => {
      try {
        const areas = typeof vendor.service_areas === 'string'
          ? JSON.parse(vendor.service_areas)
          : vendor.service_areas || [];
        areas.forEach((area: string) => locationSet.add(area));
      } catch {
        // Ignore parse errors
      }
    });
    return Array.from(locationSet).sort();
  }, [vendors]);

  // Apply filters and sorting
  const filteredVendors = useMemo(() => {
    let result = [...vendors];

    // Filter by location
    if (selectedLocation) {
      result = result.filter((vendor) => {
        try {
          const areas = typeof vendor.service_areas === 'string'
            ? JSON.parse(vendor.service_areas)
            : vendor.service_areas || [];
          return areas.includes(selectedLocation);
        } catch {
          return false;
        }
      });
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (vendor) => String(vendor.category?.id) === selectedCategory
      );
    }

    // Filter by verified
    if (verifiedOnly) {
      result = result.filter((vendor) => vendor.verified);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'verified':
          return (b.verified ? 1 : 0) - (a.verified ? 1 : 0) || a.name.localeCompare(b.name);
        case 'category':
          return (a.category?.name || '').localeCompare(b.category?.name || '');
        default:
          return 0;
      }
    });

    return result;
  }, [vendors, selectedLocation, selectedCategory, verifiedOnly, sortBy]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedLocation('');
    setSelectedCategory('');
    setVerifiedOnly(false);
    setSortBy('verified');
  };

  const hasActiveFilters = selectedLocation || selectedCategory || verifiedOnly;

  return (
    <>
      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-base">tune</span>
            Filter Results
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">close</span>
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">category</span>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Only Toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              Verification
            </label>
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                verifiedOnly
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-800'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {verifiedOnly ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              Verified Only
            </button>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">sort</span>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="verified">Verified First</option>
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex-wrap">
            <span className="text-xs text-gray-500 dark:text-gray-400">Active:</span>
            {selectedLocation && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
                📍 {selectedLocation}
                <button
                  onClick={() => setSelectedLocation('')}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
                {categories.find((c) => String(c.id) === selectedCategory)?.icon}{' '}
                {categories.find((c) => String(c.id) === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            )}
            {verifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md">
                ✓ Verified Only
                <button
                  onClick={() => setVerifiedOnly(false)}
                  className="hover:text-green-900 dark:hover:text-green-100"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <strong className="text-gray-900 dark:text-white">{filteredVendors.length}</strong> of{' '}
          <strong className="text-gray-900 dark:text-white">{vendors.length}</strong> results
          {hasActiveFilters && (
            <span className="ml-2 text-blue-600 dark:text-blue-400">(filtered)</span>
          )}
        </p>
      </div>

      {/* Results Grid or Empty State */}
      {filteredVendors.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 text-4xl mb-3 block">
            filter_alt_off
          </span>
          <p className="text-yellow-800 dark:text-yellow-300 font-medium mb-2">
            No providers match your filters
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-4">
            Try adjusting your filters or search for something else
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                Clear filters
              </button>
            )}
            <Link
              href="/vendors"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-base">list</span>
              Browse all providers
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Vendor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          {/* Browse All Link */}
          <div className="text-center mt-10">
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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