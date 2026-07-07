'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import VendorCard, { RatingData } from '@/components/VendorCard';
import VendorFilters from './VendorFilters'; // Import the new advanced filters
import type { Vendor, Category } from '@/lib/directus';

// Dynamically import the map to avoid SSR issues
const VendorMap = dynamic(() => import('@/components/VendorMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <span className="material-symbols-outlined text-4xl text-gray-400 mb-2 block">map</span>
        <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
      </div>
    </div>
  )
});

interface VendorListProps {
  vendors: (Vendor & { category: Category })[];
  currentCategory?: string;
  categories: Category[];
  ratingsMap: Record<number, RatingData>;
}

export default function VendorList({ 
  vendors, 
  currentCategory, 
  categories, 
  ratingsMap 
}: VendorListProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filteredVendors, setFilteredVendors] = useState<(Vendor & { category: Category })[]>(vendors);
  
  // ✅ NEW: "Load More" Pagination State
  const [visibleCount, setVisibleCount] = useState(24); // Show 24 items initially

  // Initialize filteredVendors with the initial vendors prop when vendors change
  useEffect(() => {
    setFilteredVendors(vendors);
    setVisibleCount(24); // Reset pagination when vendors prop changes (e.g., category change)
  }, [vendors]);

  // Handle filter changes from the new VendorFilters component (only non-category filters)
  const handleFilterChange = (newFilteredVendors: (Vendor & { category: Category })[]) => {
    setFilteredVendors(newFilteredVendors);
    setVisibleCount(24); // Reset pagination when filters change
  };

  // Get the vendors to display based on "Load More" count
  const vendorsToShow = filteredVendors.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVendors.length;

  return (
    <div className="space-y-6">
      {/* ✅ NEW: Advanced Filters Component */}
      <VendorFilters 
        vendors={vendors}
        currentCategory={currentCategory}
        categories={categories}
        ratingsMap={ratingsMap}
        onFilterChange={handleFilterChange}
      />

      {/* View Toggle (List/Map) */}
      <div className="flex justify-end">
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">list</span>
            List
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
              viewMode === 'map'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">map</span>
            Map
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-white">{vendorsToShow.length}</span> of {filteredVendors.length} providers
        {viewMode === 'map' && (
          <>
            {' • '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredVendors.filter(v => v.latitude && v.longitude).length}
            </span> with location data
          </>
        )}
      </div>

      {/* Content: List or Map */}
      {filteredVendors.length === 0 && currentCategory ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 text-4xl mb-3 block">
            search_off
          </span>
          <p className="text-yellow-800 dark:text-yellow-300 font-medium">
            No providers match your filters in this category. Try adjusting your search criteria.
          </p>
          <a 
            href="/vendors" 
            className="mt-3 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all providers
          </a>
        </div>
      ) : filteredVendors.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 text-4xl mb-3 block">
            search_off
          </span>
          <p className="text-yellow-800 dark:text-yellow-300 font-medium">
            No providers match your filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : viewMode === 'map' ? (
        <VendorMap vendors={filteredVendors} height="600px" />
      ) : (
        <>
          {/* Vendor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorsToShow.map((vendor) => (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor} 
                ratingData={ratingsMap[vendor.id]}
              />
            ))}
          </div>

          {/* ✅ NEW: Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 24)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <span className="material-symbols-outlined">expand_more</span>
                Load More Providers ({filteredVendors.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}