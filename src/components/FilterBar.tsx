'use client';

import { useState } from 'react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  allAreas: string[];
  minRating: number;
  setMinRating: (value: number) => void;
  minGoogleRating: number;
  setMinGoogleRating: (value: number) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (value: boolean) => void;
  sortBy: 'name' | 'rating' | 'google-rating' | 'reviews';
  setSortBy: (value: 'name' | 'rating' | 'google-rating' | 'reviews') => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  allAreas,
  minRating,
  setMinRating,
  minGoogleRating,
  setMinGoogleRating,
  showVerifiedOnly,
  setShowVerifiedOnly,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  const [areaSearch, setAreaSearch] = useState('');

  const filteredAreas = allAreas.filter((area) =>
    area.toLowerCase().includes(areaSearch.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            search
          </span>
          <input
            type="text"
            placeholder="Search providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        {/* Area/City */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            location_on
          </span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
          >
            <option value="">All Areas</option>
            {allAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Rating */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            star
          </span>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
          >
            <option value={0}>Any Rating</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={3.5}>3.5+ Stars</option>
            <option value={3}>3+ Stars</option>
          </select>
        </div>

        {/* Minimum Google Rating */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            star
          </span>
          <select
            value={minGoogleRating}
            onChange={(e) => setMinGoogleRating(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
          >
            <option value={0}>Any Google Rating</option>
            <option value={4.5}>4.5+ Google Stars</option>
            <option value={4}>4+ Google Stars</option>
            <option value={3.5}>3.5+ Google Stars</option>
            <option value={3}>3+ Google Stars</option>
          </select>
        </div>

        {/* Verified Only */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showVerifiedOnly}
              onChange={(e) => setShowVerifiedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <span className="material-symbols-outlined text-blue-600 text-base">
                verified
              </span>
              Verified only
            </span>
          </label>
        </div>

        {/* Sort By */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
          >
            <option value="name">Name (A-Z)</option>
            <option value="rating">Platform Rating</option>
            <option value="google-rating">Google Rating</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>
    </div>
  );
}