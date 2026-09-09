import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchResultsClient from './SearchResultsClient';
import { getCategories, searchVendors, Vendor, Category } from '@/lib/directus';

// NOTE: no `force-dynamic` here on purpose — /vendors (the working reference)
// omits it. With a fully static `export const metadata` there is no dynamic
// metadata to evaluate at build time, so the static-metadata page pattern
// holds on Vercel exactly like /vendors. Keep the two pages structurally
// identical so we don't diverge into different flight-serialization paths.
interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function resolveQuery(searchParams: Promise<{ q?: string }>) {
  const sp = await searchParams;
  return (sp.q || '').toString().trim();
}

// Next 16 + React 19: an `export async function metadata` that awaits the
// `searchParams` Promise fails inside React Flight when it serializes the
// `Next.MetadataOutlet` slot during client navigation (router.push) —
// `TypeError: Cannot read properties of undefined (reading '$$typeof')`.
// A full page GET masks this (SSR is lenient), but the in-app search bar
// (client nav) hits it and renders the error page. The working /vendors
// page sidesteps this with a *static* `export const metadata`. Do the same.
// Per-query SEO (dynamic title/OG/ItemList) is a follow-up — emit from the
// client once this barrier is cleared, not via the RSC metadata path.
export const metadata: Metadata = {
  title: 'Search — EasyFinder UAE',
  description: 'Search the UAE directory of verified service providers.',
  openGraph: {
    title: 'Search — EasyFinder UAE',
    description: 'Find a reliable local provider in minutes.',
    url: '/search',
  },
};

async function SearchPageContent({ searchParams }: SearchPageProps) {
  // Next 16: searchParams is async — must be awaited before use.
  const q = await resolveQuery(searchParams);

  // Initial page of 12, total = filter_count (proven against api.easyfinder.ae).
  // BOTH fetches are guarded: an API hiccup must degrade to an empty state,
  // never a hard 500 ("A server error occurred") on a user-facing page.
  let vendors: (Vendor & { category: Category })[] = [];
  let total = 0;
  let categories: Category[] = [];
  try {
    const [cats, search] = await Promise.all([
      getCategories(),
      searchVendors(q, 12, 0),
    ]);
    categories = cats;
    vendors = search.items;
    total = search.total;
  } catch (err) {
    console.error('search page data fetch failed', err);
  }

  // JSON-LD — ItemList of the current result page. Only emitted when there
  // are vendors (no noise). Static metadata is separate; this block is the
  // dynamic SEO payload. Same inline <script> pattern proven on
  // /vendors/[slug] (two such scripts, working flight).
  const jsonLd = vendors.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: q ? `Results for "${q}"` : 'Search results',
    numberOfItems: total,
    itemListElement: vendors.slice(0, 30).map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.name,
      url: `/vendors/${v.slug}`,
    })),
  } : null;

  return (
    <div style={{ backgroundColor: 'var(--color-bone)' }} className="min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* HEADER BAND */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-ink) 0%, var(--color-ink-soft) 100%)',
        }}
        className="px-6 py-10 md:py-14"
      >
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest"
              style={{ color: 'var(--color-brass)' }}
            >
              <span className="material-symbols-outlined text-sm">search</span>
              Search the directory
            </div>
            <h1 className="font-display text-3xl font-bold md:text-4xl"
              style={{ color: 'var(--color-bone)' }}
            >
              {q ? <>Results for "{q}"</> : 'Find a provider'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base"
              style={{ color: 'rgba(244,241,234,0.65)' }}
            >
              {q
                ? <>Showing the top matches first — verified providers are pinned to the top.</>
                : <>Type a service, a name, or a city — then hit search up top.</>}
            </p>
          </div>
          <div
            className="hidden rounded-2xl px-5 py-4 text-right md:flex"
            style={{ background: 'rgba(244,241,234,0.06)', border: '1px solid rgba(244,241,234,0.12)' }}
          >
            <div className="font-display text-2xl font-bold" style={{ color: 'var(--color-brass)' }}>
              {total.toLocaleString()}
            </div>
            <div className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(244,241,234,0.5)' }}>
              providers match
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <SearchResultsClient
          key={q}
          initialVendors={vendors}
          total={total}
          query={q}
          categories={categories}
        />
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <p className="text-ink/50 py-10 text-center">Loading providers…</p>
  );
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchPageContent {...props} />
    </Suspense>
  );
}
