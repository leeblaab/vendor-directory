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
      <div className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm mb-8">
        <div className="relative max-w-2xl mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-ink/35 text-2xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search categories (e.g., plumber, electrician, mover...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-bone/60 border border-ink/10 rounded-xl focus:ring-2 focus:ring-brass/50 focus:border-transparent text-lg text-ink placeholder:text-ink/40"
          />
        </div>
        
        {/* Results count */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted">
            Showing <span className="font-semibold text-ink">{filteredCategories.length}</span> of {categories.length} categories
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="bg-brass/[0.07] border border-brass/30 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-brass-deep text-4xl mb-3 block">
            search_off
          </span>
          <p className="text-ink/70 font-medium">
            No categories match your search. Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block group"
            >
              <SpotlightCard
                spotlightColor="rgba(199, 154, 77, 0.15)"
                spotlightSize={250}
                className="border-ink/10 hover:border-brass/50"
              >
                <div className="p-5 text-center">
                  {/* Category Image */}
                  {category.category_image ? (
                    <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-bone">
                      <Image
                        src={`/api/directus/assets/${category.category_image.id}`}
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
                          <span className="material-symbols-outlined text-5xl text-brass-deep group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
                          </span>
                          <div className="absolute inset-0 blur-xl bg-brass/25 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    )
                  )}
                  
                  {/* Category Name */}
                  <h3 className="font-semibold text-ink text-sm group-hover:text-brass-deep transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Hover indicator */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-brass-deep font-medium">
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