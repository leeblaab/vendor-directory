import { getCategories, Category } from '@/lib/directus';
import CategoriesClient from './CategoriesClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Categories - EasyFinder UAE',
  description: 'Browse 60+ service categories in the UAE. Find plumbers, electricians, movers, photographers, and more trusted service providers.',
  keywords: ['service categories', 'UAE services', 'plumbers', 'electricians', 'movers', 'Dubai services'],
};

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let error = false;

  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Failed to load categories:', err);
    error = true;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 sm:p-12 shadow-xl mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Browse All Categories
        </h1>
        <p className="text-lg sm:text-xl opacity-90 max-w-2xl">
          Discover trusted service providers across {categories.length} categories in the UAE
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-4xl mb-3 block">
            error
          </span>
          <p className="text-red-700 dark:text-red-300 font-medium">
            Unable to load categories. Please try again later.
          </p>
        </div>
      ) : (
        <CategoriesClient categories={categories} />
      )}
    </main>
  );
}