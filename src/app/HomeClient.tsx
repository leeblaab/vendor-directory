'use client';

import { fetchCategoriesAction, fetchVendorsAction } from './actions';
import { Category, Vendor } from '@/lib/directus';
import React, { useState, useEffect } from 'react';
import { SpotlightCard } from '@/components/animata/card/SpotlightCard';
import Image from 'next/image';

export default function HomeClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [vendors, setVendors] = useState<(Vendor & { category: Category })[]>([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [vendorsError, setVendorsError] = useState(false);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await fetchCategoriesAction();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategoriesError(true);
      }
    }

    fetchCategories();
  }, []);

  // Fetch featured vendors
  useEffect(() => {
    async function fetchVendors() {
      try {
        const fetchedVendors = await fetchVendorsAction(12);
        setVendors(fetchedVendors);
      } catch (error) {
        console.error('Failed to load vendors:', error);
        setVendorsError(true);
      }
    }

    fetchVendors();
  }, []);

  return (
    <div className="space-y-12">
      {/* Categories Section */}
      {categoriesError ? (
        <section className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-700">Unable to load categories. Please try again later.</p>
        </section>
      ) : categories.length > 0 ? (
        <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
            Popular Services
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category: any) => (
              <a
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
                          src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${category.category_image.id}?width=400&height=400&fit=cover`}
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
                    <h3 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    {/* Hover indicator */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-blue-600 font-medium">
                        Explore →
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {/* Featured Providers Section */}
      {vendorsError ? (
        <section className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-700">Unable to load service providers. Please try again later.</p>
        </section>
      ) : vendors.length > 0 ? (
        <section id="find-providers" className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
            Featured Service Providers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendors.map((vendor: any) => (
              <a
                key={vendor.id}
                href={`/vendors/${vendor.slug}`}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-2 flex-1 group-hover:text-blue-600 transition-colors">
                      {vendor.name}
                    </h3>
                    {vendor.verified && <span className="ml-2 text-green-600 text-sm">✓</span>}
                  </div>

                  {vendor.category?.name && (
                    <p className="text-xs text-blue-600 font-medium mb-3">{vendor.category.name}</p>
                  )}

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {vendor.description || 'Professional service provider'}
                  </p>

                  {/* Contact Info */}
                  {vendor.phone && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.17 2.71a.678.678 0 0 0-.063 1.015c.252.325.484.645.708.95.412.617.797 1.222 1.136 1.873.34.65.646 1.334.822 2.03.176.696.246 1.405.243 2.117a9.996 9.996 0 0 1-.924 3.212c-.253.468-.415.945-.557 1.42-.154.485-.259 1.15-.27 1.777a.678.678 0 0 0 .63.744h.867a.678.678 0 0 0 .632-.327c.215-.456.499-1.34.779-2.105.28-.764.604-1.554.928-2.295.324-.74.684-1.437.957-2.037.273-.6.519-1.135.757-1.645.112-.26.231-.51.35-.747l.531.531a.678.678 0 0 0 .954 0l1.315-1.314a.678.678 0 0 0 0-.954L3.654 1.328zM11 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
                        </svg>
                        <span>{vendor.phone}</span>
                      </div>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <a
              href="/vendors"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              View All Providers →
            </a>
          </div>
        </section>
      ) : null}
    </div>
  );
}