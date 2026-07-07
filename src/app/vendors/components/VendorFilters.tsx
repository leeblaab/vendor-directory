'use client';

import { useState, useEffect, useMemo } from 'react';
import { Vendor, Category } from '@/lib/directus';
import { RatingData } from '@/components/VendorCard';

interface VendorFiltersProps {
  vendors: (Vendor & { category: Category })[];
  currentCategory?: string;
  categories?: Category[];
  ratingsMap?: Record<number, RatingData>;
  onFilterChange?: (filtered: (Vendor & { category: Category })[]) => void;
}

export default function VendorFilters({ 
  vendors, 
  currentCategory, 
  categories = [], 
  ratingsMap = {},
  onFilterChange 
}: VendorFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || '');
  const [categorySearch, setCategorySearch] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  // ✅ NEW: City search state
  const [citySearch, setCitySearch] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

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

  // ✅ NEW: Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!citySearch) return cities.slice(0, 50); // Show first 50 if no search
    const query = citySearch.toLowerCase();
    return cities
      .filter(city => city.toLowerCase().includes(query))
      .slice(0, 50); // Limit to 50 results
  }, [cities, citySearch]);


  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!categorySearch) return categories;
    const query = categorySearch.toLowerCase();
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(query)
    );
  }, [categories, categorySearch]);

  // Apply filters whenever any filter changes
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

    // UPDATED: Filter by city/area with PARTIAL MATCHING
    if (selectedCity) {
      const selectedCityLower = selectedCity.toLowerCase();
      filtered = filtered.filter(vendor => {
        try {
          const areas = typeof vendor.service_areas === 'string'
            ? JSON.parse(vendor.service_areas)
            : vendor.service_areas || [];
          
          // PARTIAL MATCH: Check if ANY area CONTAINS the selected city/area
          return areas.some((area: string) => 
            area.toLowerCase().includes(selectedCityLower)
          );
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

    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter(vendor => {
        const rating = ratingsMap[vendor.id]?.average || 0;
        return rating >= minRating;
      });
    }

    // Filter by verified only
    if (verifiedOnly) {
      filtered = filtered.filter(vendor => vendor.verified);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'verified':
          return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
        case 'rating':
          const ratingA = ratingsMap[a.id]?.average || 0;
          const ratingB = ratingsMap[b.id]?.average || 0;
          return ratingB - ratingA;
        default:
          return 0;
      }
    });

    onFilterChange?.(filtered);
  }, [vendors, searchQuery, selectedCity, selectedCategory, minRating, verifiedOnly, sortBy, ratingsMap, onFilterChange]);

  const hasActiveFilters = searchQuery || selectedCity || selectedCategory || minRating > 0 || verifiedOnly;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="space-y-4">
        {/* Row 1: Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">search</span>
            Search Providers
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Row 2: Category with Autocomplete */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">category</span>
              Category
            </label>
            <div className="relative">
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Type to search categories..."
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              
              {/* Category Dropdown */}
              {categorySearch && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCategories.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No categories found
                    </div>
                  ) : (
                    filteredCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setCategorySearch('');
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                          selectedCategory === cat.slug ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        {cat.icon && (
                          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                            {cat.icon}
                          </span>
                        )}
                        <span className="text-gray-900 dark:text-white">{cat.name}</span>
                        {selectedCategory === cat.slug && (
                          <span className="material-symbols-outlined text-green-600 ml-auto">check</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            
            {/* Selected Category Badge */}
            {selectedCategory && (
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg">
                  <span className="material-symbols-outlined text-base">
                    {categories.find(c => c.slug === selectedCategory)?.icon}
                  </span>
                  {categories.find(c => c.slug === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Row 3: City and Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City Filter with Autocomplete */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">location_on</span>
            Area/City
          </label>
          
          <div className="relative">
            {/* Search Input */}
            <input
              type="text"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setIsCityDropdownOpen(true);
              }}
              onFocus={() => setIsCityDropdownOpen(true)}
              placeholder={selectedCity ? selectedCity : "Search area or city..."}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            
            {/* Clear button */}
            {selectedCity && (
              <button
                onClick={() => {
                  setSelectedCity('');
                  setCitySearch('');
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
            
            {/* Dropdown arrow */}
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className={`material-symbols-outlined text-sm transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Dropdown Results */}
            {isCityDropdownOpen && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {filteredCities.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    No areas found
                  </div>
                ) : (
                  <>
                    {/* Quick filters for major emirates */}
                    {!citySearch && (
                      <div className="border-b border-gray-200 dark:border-gray-700 p-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">Popular Emirates</p>
                        <div className="flex flex-wrap gap-1">
                          {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].map(emirate => (
                            <button
                              key={emirate}
                              onClick={() => {
                                setSelectedCity(emirate);
                                setCitySearch(emirate);
                                setIsCityDropdownOpen(false);
                              }}
                              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              {emirate}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* City/Area List */}
                    <div className="py-1">
                      {filteredCities.map(city => (
                        <button
                          key={city}
                          onClick={() => {
                            setSelectedCity(city);
                            setCitySearch(city);
                            setIsCityDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                            selectedCity === city ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <span className="text-gray-900 dark:text-white text-sm">{city}</span>
                          {selectedCity === city && (
                            <span className="material-symbols-outlined text-green-600 text-sm">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Selected City Badge */}
          {selectedCity && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg">
                <span className="material-symbols-outlined text-base">location_on</span>
                {selectedCity}
                <button
                  onClick={() => {
                    setSelectedCity('');
                    setCitySearch('');
                  }}
                  className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            </div>
          )}
        </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">star</span>
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value={0}>Any Rating</option>
              <option value={4}>4+ Stars</option>
              <option value={3}>3+ Stars</option>
              <option value={2}>2+ Stars</option>
              <option value={1}>1+ Stars</option>
            </select>
          </div>
        </div>

        {/* Row 4: Verified Toggle and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Verified Only Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">verified</span>
              Verified Providers
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Show verified only</span>
            </label>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="material-symbols-outlined text-base inline-block mr-1 align-text-bottom">sort</span>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="name">Name (A-Z)</option>
              <option value="verified">Verified First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800 flex-wrap">
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
                Category: {categories.find(c => c.slug === selectedCategory)?.name}
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
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
                Rating: {minRating}+
                <button
                  onClick={() => setMinRating(0)}
                  className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            )}
            {verifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
                Verified Only
                <button
                  onClick={() => setVerifiedOnly(false)}
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
                setMinRating(0);
                setVerifiedOnly(false);
                setSortBy('name');
              }}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}