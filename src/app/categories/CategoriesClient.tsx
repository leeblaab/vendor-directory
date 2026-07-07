'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/directus';
import { SpotlightCard } from '@/components/animata/card/SpotlightCard';

interface CategoriesClientProps {
  categories: Category[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories based on search (by name only)
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(query)
    );
  }, [categories, searchQuery]);

  return (
    <div>
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <div className="relative max-w-2xl mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search categories (e.g., plumber, electrician, mover...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
        
        {/* Results count */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredCategories.length}</span> of {categories.length} categories
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 text-4xl mb-3 block">
            search_off
          </span>
          <p className="text-yellow-800 dark:text-yellow-300 font-medium">
            No categories match your search. Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/vendors?category=${category.slug}`}
              className="block group"
            >
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.15)"
                spotlightSize={250}
              >
                <div className="p-5 text-center">
                  {/* Category Image */}
                  {category.category_image ? (
                    <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={`/api/directus/assets/${category.category_image.id}?width=400&height=400&fit=cover`}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      />
                    </div>
                  ) : (
                    // Fallback to icon if no image
                    category.icon && (
                      <div className="mb-3 flex justify-center">
                        <div className="relative">
                          <span className="material-symbols-outlined text-5xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
                          </span>
                          <div className="absolute inset-0 blur-xl bg-blue-400/30 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    )
                  )}
                  
                  {/* Category Name */}
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Hover indicator */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Explore →
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}