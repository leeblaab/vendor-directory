import { getAllVendors, getCategories, Category, Vendor } from '@/lib/directus';
import VendorList from './components/VendorList';
import Breadcrumbs from '@/components/Breadcrumbs';
import { RatingData } from '@/components/VendorCard';

export default async function VendorsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const urlCategory = params.category as string | undefined;
  
  let allVendors: (Vendor & { category: Category })[] = [];
  let categories: Category[] = [];
  let error = false;

  try {
    // ✅ ALWAYS fetch ALL vendors - let the client-side filter handle it
    allVendors = await getAllVendors();
    categories = await getCategories();
  } catch (err) {
    console.error('Failed to load vendors:', err);
    error = true;
  }

  // ✅ FIXED: Fetch ratings for all vendors in a SINGLE batched query
  const ratingsMap: Record<number, RatingData | null> = {};
  if (!error && allVendors.length > 0) {
    try {
      const { getReviewsForVendors } = await import('@/lib/directus');
      const vendorIds = allVendors.map(v => v.id);
      const allReviews = await getReviewsForVendors(vendorIds);
      
      const reviewsByVendor: Record<number, number[]> = {}; 
      for (const review of allReviews) {
        const vId = typeof review.vendor === 'object' ? review.vendor.id : review.vendor;
        if (!reviewsByVendor[vId]) reviewsByVendor[vId] = [];
        reviewsByVendor[vId].push(review.rating);
      }

      for (const vendor of allVendors) {
        const ratings = reviewsByVendor[vendor.id] || [];
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, r) => acc + r, 0);
          ratingsMap[vendor.id] = {
            average: Math.round((sum / ratings.length) * 10) / 10,
            count: ratings.length,
          };
        } else {
          ratingsMap[vendor.id] = null;
        }
      }
    } catch (ratingErr) {
      console.error('Failed to load some vendor ratings:', ratingErr);
    }
  }

  // Get category name for breadcrumbs if URL has category
  let categoryName: string | null = null;
  let categoryIcon: string | null = null;
  if (urlCategory && categories.length > 0) {
    const foundCategory = categories.find((cat) => cat.slug === urlCategory);
    categoryName = foundCategory?.name || urlCategory;
    categoryIcon = foundCategory?.icon || null;
  }

  const breadcrumbs = urlCategory
    ? [
        { label: 'Home', href: '/' },
        { label: 'All Providers', href: '/vendors' },
        { label: categoryName || urlCategory },
      ]
    : [{ label: 'Home', href: '/' }, { label: 'All Providers' }];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
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
              {!error && allVendors.length > 0 && (
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-base">business</span>
                    {allVendors.length} {allVendors.length === 1 ? 'Provider' : 'Providers'}
                  </span>
                  {urlCategory && (
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
      ) : (
        <VendorList 
          vendors={allVendors}  // ✅ PASS ALL VENDORS (not filtered)
          currentCategory={urlCategory} 
          categories={categories} 
          ratingsMap={ratingsMap}
        />
      )}
    </main>
  );
}