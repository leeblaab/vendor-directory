import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  getCategories,
  getVendorsBrowsePage,
  Category,
} from '@/lib/directus';
import { buildBatchRatings, VendorRow } from './lib/batch';
import { RatingData } from '@/components/VendorCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategorySEOText from '@/components/CategorySEOText';
import BrowseClient from './BrowseClient';

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/vendors`,
  },
};

function LoadingFallback() {
  return (
    <p className="text-ink/50 py-10 text-center">Loading providers…</p>
  );
}

async function VendorsPageContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const urlCategory = (params.category as string) || null;

  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Failed to load categories:', err);
  }
  const category = urlCategory
    ? categories.find((cat) => cat.slug === urlCategory) || null
    : null;

  // Initial page of 12 + authoritative total (server-side, anonymous-safe).
  let initial: VendorRow[] = [];
  let total = 0;
  let ratingsMap: Record<number, RatingData> = {};
  let error = false;
  try {
    const page = await getVendorsBrowsePage(
      category ? category.id : null,
      PAGE_SIZE,
      0
    );
    initial = page.items;
    total = page.total;
    ratingsMap = await buildBatchRatings(initial);
  } catch (err) {
    console.error('Failed to load vendors:', err);
    error = true;
  }

  const breadcrumbs = urlCategory
    ? [
        { label: 'Home', href: '/' },
        { label: 'All Providers', href: '/vendors' },
        { label: category?.name || decodeURIComponent(urlCategory) },
      ]
    : [{ label: 'Home', href: '/' }, { label: 'All Providers' }];

  const title = category
    ? `${category.name} Service Providers`
    : 'All Service Providers';
  const tagline = category
    ? `Browse trusted ${category.name.toLowerCase()} providers across the UAE. Contact them directly via WhatsApp or phone.`
    : 'Discover reliable service providers across the UAE — plumbing, electrical, AC, cleaning, movers and more.';

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero header — Gulf ink & brass */}
      <div className="rounded-2xl border border-ink/10 bg-bone p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brass to-brass-deep flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="material-symbols-outlined text-bone text-4xl">
              {category?.icon || 'storefront'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">
              {title}
            </h1>
            <p className="text-ink/60 mt-2 max-w-2xl">{tagline}</p>
            {!error && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-verified-soft border border-verified/30 text-verified text-sm font-medium">
                  <span className="material-symbols-outlined text-base">
                    business
                  </span>
                  {total.toLocaleString()} providers
                </span>
                {urlCategory && (
                  <a
                    href="/vendors"
                    className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-brass transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      arrow_back
                    </span>
                    View all providers
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {urlCategory && <CategorySEOText slug={urlCategory} />}

      {error ? (
        <div className="rounded-xl border border-ink/10 bg-bone p-10 text-center">
          <span className="material-symbols-outlined text-ink/40 text-5xl mb-3 block">
            error
          </span>
          <p className="text-ink/70 font-medium">
            Unable to load service providers. Please try again later.
          </p>
        </div>
      ) : (
        <BrowseClient
          initialVendors={initial}
          initialRatings={ratingsMap}
          total={total}
          pageSize={PAGE_SIZE}
          categoryId={category ? category.id : null}
          categoryName={category?.name || null}
        />
      )}
    </main>
  );
}

export default function VendorsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VendorsPageContent {...props} />
    </Suspense>
  );
}
