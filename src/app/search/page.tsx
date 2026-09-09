import { Metadata } from 'next';
import SearchResultsClient from './SearchResultsClient';
import { getCategories, searchVendors, Vendor, Category } from '@/lib/directus';

interface SearchPageProps {
  params: Promise<{ q: string[] }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function resolveQuery(searchParams: Promise<{ q?: string }>) {
  const sp = await searchParams;
  return (sp.q || '').toString().trim();
}

export async function metadata({ searchParams }: Omit<SearchPageProps, 'params'>): Promise<Metadata> {
  const q = await resolveQuery(searchParams);
  const baseTitle = q ? `Search "${q}" — EasyFinder UAE` : 'Search — EasyFinder UAE';
  const baseDesc = q
    ? `Browse service providers in UAE who match "${q}".`
    : 'Search the UAE directory of service providers.';
  return {
    title: baseTitle,
    description: baseDesc,
    openGraph: {
      title: baseTitle,
      description: baseDesc,
      url: q ? `/search?q=${encodeURIComponent(q)}` : '/search',
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const [q, categories] = await Promise.all([
    resolveQuery(searchParams),
    getCategories(),
  ]);

  // Initial page of 12, total = filter_count (proven against api.easyfinder.ae).
  let vendors: (Vendor & { category: Category })[] = [];
  let total = 0;
  try {
    const { items, total: t } = await searchVendors(q, 12, 0);
    vendors = items;
    total = t;
  } catch (err) {
    console.error('searchVendors failed on /search', err);
  }

  // JSON-LD — only when non-empty to avoid noise.
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
