import { getAllVendors, getVendorsByCategory, getCategories, getReviewsForVendors, Category, Vendor } from '@/lib/directus';
import VendorList from './components/VendorList';
import Breadcrumbs from '@/components/Breadcrumbs';
import { RatingData } from '@/components/VendorCard';
import dynamic from 'next/dynamic';

export default async function VendorsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const category = params.category as string;
  
  let vendors: (Vendor & { category: Category })[] = [];
  let categories: Category[] = [];
  let error = false;
  let categoryName: string | null = null;
  let categoryIcon: string | null = null;

  try {
    // Fetch categories first
    categories = await getCategories();
    
    if (category) {
      vendors = await getVendorsByCategory(category);
      
      const foundCategory = categories.find((cat) => cat.slug === category);
      categoryName = foundCategory?.name || category;
      categoryIcon = foundCategory?.icon || null;
    } else {
      vendors = await getAllVendors();
    }
  } catch (err) {
    console.error('Failed to load vendors:', err);
    error = true;
  }

  // ✅ FIXED: Fetch ratings for all vendors in a SINGLE batched query to prevent server freeze (N+1 problem)
  const ratingsMap: Record<number, RatingData | null> = {};
  if (!error && vendors.length > 0) {
    try {
      const vendorIds = vendors.map(v => v.id);
      
      // 1. Fetch all reviews for all vendors at once (chunked automatically)
      const allReviews = await getReviewsForVendors(vendorIds);
      
      // 2. Group reviews by vendor ID in memory
      const reviewsByVendor: Record<number, number[]> = {}; 
      for (const review of allReviews) {
        // Handle both cases: vendor as ID (number) or vendor as object
        const vId = typeof review.vendor === 'object' ? review.vendor.id : review.vendor;
        if (!reviewsByVendor[vId]) reviewsByVendor[vId] = [];
        reviewsByVendor[vId].push(review.rating);
      }

      // 3. Calculate averages in memory (Instant!)
      for (const vendor of vendors) {
        const ratings = reviewsByVendor[vendor.id] || [];
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, r) => acc + r, 0);
          ratingsMap[vendor.id] = {
            average: Math.round((sum / ratings.length) * 10) / 10,
            count: ratings.length,
          };
        } else {
          ratingsMap[vendor.id] = null; // Maintain compatibility with original behavior for vendors with 0 reviews
        }
      }
    } catch (ratingErr) {
      console.error('Failed to load some vendor ratings:', ratingErr);
    }
  }

  const breadcrumbs = category
    ? [
        { label: 'Home', href: '/' },
        { label: 'All Providers', href: '/vendors' },
        { label: categoryName || category },
      ]
    : [{ label: 'Home', href: '/' }, { label: 'All Providers' }];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Category Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 shadow-md">
            {categoryIcon ? (
              <span className="material-symbols-outlined text-white text-4xl">
                {categoryIcon}
              </span>
            ) : (
              '🔧'
            )}
          </div>

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {categoryName ? `${categoryName} Service Providers` : 'All Service Providers'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                  {categoryName 
                    ? `Browse trusted ${categoryName.toLowerCase()} providers across the UAE. Contact them directly via WhatsApp or phone.`
                    : 'Discover reliable service providers across the UAE for plumbing, electrical work, cleaning, and more.'}
                </p>
              </div>

              {/* Result Count Badge */}
              {!error && vendors.length > 0 && (
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-base">business</span>
                    {vendors.length} {vendors.length === 1 ? 'Provider' : 'Providers'}
                  </span>
                  {category && (
                    <a
                      href="/vendors"
                      className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">arrow_back</span>
                      View all providers
                    </a>
                  )}
                </div>
              )}
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
            Unable to load service providers. Please try again later.
          </p>
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 text-4xl mb-3 block">
            search_off
          </span>
          <p className="text-yellow-800 dark:text-yellow-300 font-medium mb-2">
            {categoryName 
              ? `No ${categoryName.toLowerCase()} providers found at the moment.`
              : 'No published service providers found at the moment.'}
          </p>
          {category && (
            <a
              href="/vendors"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-base">list</span>
              Browse all providers
            </a>
          )}
        </div>
      ) : (
        <VendorList 
          vendors={vendors} 
          currentCategory={category} 
          categories={categories} 
          ratingsMap={ratingsMap} // ✅ Pass the ratings map down
        />
      )}
    </main>
  );
  
}