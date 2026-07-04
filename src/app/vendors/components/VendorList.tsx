'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import VendorCard, { RatingData } from '@/components/VendorCard';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Extract unique cities from vendors
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    vendors.forEach(vendor => {
      const areas = Array.isArray(vendor.service_areas) 
        ? vendor.service_areas 
        : typeof vendor.service_areas === 'string' 
          ? [vendor.service_areas] 
          : [];
      areas.forEach(area => {
        const cleanArea = area.toLowerCase().trim();
        if (cleanArea && !['dubai', 'abu dhabi', 'sharjah', 'ajman'].includes(cleanArea)) {
          citySet.add(area);
        }
      });
    });
    return ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', ...Array.from(citySet)];
  }, [vendors]);

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let result = [...vendors];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.name?.toLowerCase().includes(query) ||
        v.description?.toLowerCase().includes(query) ||
        v.phone?.includes(query)
      );
    }

    // City filter
    if (selectedCity !== 'all') {
      result = result.filter(v => {
        const areas = Array.isArray(v.service_areas) 
          ? v.service_areas 
          : typeof v.service_areas === 'string' 
            ? [v.service_areas] 
            : [];
        return areas.some(area => 
          area.toLowerCase().includes(selectedCity.toLowerCase())
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        const ratingA = ratingsMap[a.id]?.average || 0;
        const ratingB = ratingsMap[b.id]?.average || 0;
        return ratingB - ratingA;
      }
      return 0;
    });

    return result;
  }, [vendors, searchQuery, selectedCity, sortBy, ratingsMap]);

  return (
    <div>
      {/* Filters & View Toggle */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Top row: Search and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg self-start">
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

          {/* Bottom row: City and Sort filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredVendors.length}</span> provider{filteredVendors.length !== 1 ? 's' : ''}
            {viewMode === 'map' && (
              <>
                {' • '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredVendors.filter(v => v.latitude && v.longitude).length}
                </span> with location data
              </>
            )}
          </p>
        </div>
      </div>

      {/* Content: List or Map */}
      {filteredVendors.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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