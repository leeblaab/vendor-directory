import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import VendorCard from '@/components/VendorCard';
import { getCategories, getCategoryTopVendors } from '@/lib/directus';
import { getCategorySEO } from '@/lib/category-seo-data';

// Full SSG: all 60 category landing pages prerender at build → edge-cached, 0 TTFB.
// dynamicParams: false → unknown slug = hard 404 (never a runtime 17k-row fetch).
export const dynamicParams = false;
export const revalidate = 3600; // cheap hourly ISR refresh after build

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

async function loadCategory(slug: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) return { title: 'Category Not Found' };

  const seo = getCategorySEO(slug);
  const raw = seo?.description
    || `Browse verified ${category.name.toLowerCase()} providers in the UAE.`;
  const description = raw.length > 155
    ? raw.slice(0, 155).replace(/[\s.]+$/, '') + '...'
    : raw;
  const title = seo?.title ?? `Top ${category.name} in UAE`;

  return {
    title,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `/categories/${category.slug}`,
      type: 'website',
      locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CategoryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) notFound();

  const seo = getCategorySEO(slug);
  const vendors = await getCategoryTopVendors(category.id, 12);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    || 'https://www.easyfinder.ae';
  const pageTitle = seo?.title ?? `Top ${category.name} in UAE`;

  // JSON-LD: CollectionPage + ItemList (top-12). No AggregateRating —
  // site reviews only rule (0 published site reviews; Google data excluded).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    url: `${baseUrl}/categories/${category.slug}`,
    description:
      seo?.description
      || `Browse verified ${category.name.toLowerCase()} providers in the UAE.`,
    inLanguage: 'en-AE',
    mainEntity: {
      '@type': 'ItemList',
      name: `${pageTitle} - directory`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: vendors.length,
      itemListElement: vendors.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: v.name,
        url: `${baseUrl}/vendors/${v.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]}
        />

        {/* Hero: keyword-rich, unique per category (57 SEO entries + 3 added) */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed md:text-lg">
            {seo?.description
              || `Browse EasyFinder UAE's verified ${category.name.toLowerCase()} providers across the UAE, and connect directly by phone or WhatsApp.`}
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Showing {vendors.length} featured{' '}
            {category.name.toLowerCase()}{' '}
            {vendors.length === 1 ? 'provider' : 'providers'} — verified
            businesses first.
          </p>
        </header>

        {/* Top-12 grid — reuses VendorCard (logo, name, Verified/Google-rating badges) */}
        {vendors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-muted">
            We're onboarding providers in this category — check back soon.
          </p>
        )}

        {/* CTA → full filtered directory (query string = list view, not a landing page) */}
        <div className="mt-10 text-center md:mt-14">
          <Link
            href={`/vendors?category=${category.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-bone"
          >
            Browse all {category.name.toLowerCase()} vendors
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
