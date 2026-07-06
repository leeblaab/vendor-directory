import { Metadata } from 'next';
import { getAllVendors, getCategories, Vendor, Category } from '@/lib/directus';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBar from '@/components/SearchBar';
import SearchResultsClient from './SearchResultsClient';

export const metadata: Metadata = {
  title: 'Search Results - EasyFinder UAE',
  description: 'Search for trusted service providers across the UAE',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = (params.q as string) || '';

  let vendors: (Vendor & { category: Category })[] = [];
  let categories: Category[] = [];
  let error = false;

  try {
    // Fetch all vendors and categories in parallel
    const [allVendors, allCategories] = await Promise.all([
      getAllVendors(),
      getCategories(),
    ]);

    // Filter vendors based on search query (server-side pre-filter)
    if (query) {
      const searchLower = query.toLowerCase();
      vendors = allVendors.filter((vendor) => {
        if (vendor.name.toLowerCase().includes(searchLower)) return true;
        if (vendor.description?.toLowerCase().includes(searchLower)) return true;
        if (vendor.category?.name?.toLowerCase().includes(searchLower)) return true;
        
        if (vendor.service_areas) {
          try {
            const areas = typeof vendor.service_areas === 'string'
              ? JSON.parse(vendor.service_areas)
              : vendor.service_areas;
            
            if (areas.some((area: string) => area.toLowerCase().includes(searchLower))) {
              return true;
            }
          } catch {
            // Ignore parse errors
          }
        }
        
        return false;
      });
    } else {
      vendors = allVendors;
    }

    categories = allCategories;
  } catch (err) {
    console.error('Failed to search vendors:', err);
    error = true;
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: query ? `Search: "${query}"` : 'Search Results' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Search Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
            <span className="material-symbols-outlined text-4xl">search</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {query ? `Results for "${query}"` : 'Search Service Providers'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {query
                ? `Found ${vendors.length} provider${vendors.length !== 1 ? 's' : ''} matching your search`
                : 'Enter a search term to find trusted service providers'}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-4xl mb-3 block">
            error
          </span>
          <p className="text-red-700 dark:text-red-300 font-medium">
            Unable to search service providers. Please try again later.
          </p>
        </div>
      ) : !query ? (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-blue-500 dark:text-blue-400 text-4xl mb-3 block">
            search
          </span>
          <p className="text-blue-800 dark:text-blue-300 font-medium mb-2">
            Enter a search term above
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Try searching for "plumber", "electrician", "Dubai", or "AC repair"
          </p>
        </div>
      ) : (
        <SearchResultsClient
          vendors={vendors}
          categories={categories}
          searchQuery={query}
        />
      )}
    </main>
  );
}