'use client';

import { useState, useEffect, useMemo } from 'react';
import { Vendor, Category } from '@/lib/directus';
import { RatingData } from '@/components/VendorCard'; // ✅ Import the type

interface VendorFiltersProps {
  vendors: (Vendor & { category: Category })[];
  currentCategory?: string;
  categories?: Category[];
  ratingsMap?: Record<number, RatingData>; // ✅ Added ratingsMap
  onFilterChange?: (filtered: (Vendor & { category: Category })[]) => void;
}

export default function VendorFilters({ 
  vendors, 
  currentCategory, 
  categories = [], 
  ratingsMap = {}, // ✅ Added with default empty object
  onFilterChange 
}: VendorFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || '');
  const [sortBy, setSortBy] = useState('name');

  // Extract unique cities from service_areas
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    vendors.forEach(vendor => {
      try {
        const areas = typeof vendor.service_areas === 'string' 
          ? JSON.parse(vendor.service_areas) 
          : vendor.service_areas || [];
        areas.forEach((area: string) => citySet.add(area));
      } catch {
        // Ignore parse errors
      }
    });
    return Array.from(citySet).sort();
  }, [vendors]);

  // Apply filters whenever search, city, category, or sort changes
  useEffect(() => {
    let filtered = [...vendors];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(query) ||
        vendor.description?.toLowerCase().includes(query)
      );
    }

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(vendor => {
        try {
          const areas = typeof vendor.service_areas === 'string'
            ? JSON.parse(vendor.service_areas)
            : vendor.service_areas || [];
          return areas.includes(selectedCity);
        } catch {
          return false;
        }
      });
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(vendor => 
        vendor.category && 'slug' in vendor.category && vendor.category.slug === selectedCategory
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'verified':
          return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
        // ✅ NEW: Sort by Highest Rated
        case 'rating':
          const ratingA = ratingsMap[a.id]?.average || 0;
          const ratingB = ratingsMap[b.id]?.average || 0;
          return ratingB - ratingA; 
        default:
          return 0;
      }
    });

    onFilterChange?.(filtered);
  }, [vendors, searchQuery, selectedCity, selectedCategory, sortBy, ratingsMap, onFilterChange]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">search</span>
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">category</span>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* City Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">location_on</span>
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">sort</span>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="name">Name (A-Z)</option>
            <option value="verified">Verified First</option>
            <option value="rating">Highest Rated</option> {/* ✅ NEW OPTION */}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedCity || selectedCategory) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex-wrap">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
              Search: {searchQuery}
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
              Category: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <button
                onClick={() => setSelectedCategory('')}
                className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </span>
          )}
          {selectedCity && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
              City: {selectedCity}
              <button
                onClick={() => setSelectedCity('')}
                className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('');
              setSelectedCategory(currentCategory || '');
              setSortBy('name');
            }}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}