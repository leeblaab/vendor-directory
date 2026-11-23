import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import VendorCard from '@/components/VendorCard';
import { getAreaBySlug, getGatedAreas } from '@/lib/areas';

// Full SSG for gated area pages (only areas with >= 10 real vendors are
// generated; everything else is a hard 404 — no thin doorway pages).
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  const areas = await getGatedAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return { title: 'Area Not Found' };

  const title = `Verified Businesses in ${area.displayName}, UAE (${area.count})`;
  const catHint = area.topCategories
    .slice(0, 4)
    .map((c) => c.name.toLowerCase())
    .join(', ');
  const description = `${area.count} verified local businesses serve ${area.displayName} — ${catHint} and more. Compare profiles and contact directly by phone or WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `/areas/${encodeURIComponent(area.slug)}` },
    openGraph: {
      title,
      description,
      url: `/areas/${area.slug}`,
      type: 'website',
      locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function AreaPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    || 'https://www.easyfinder.ae';
  const pageTitle = `Businesses in ${area.displayName}`;

  // JSON-LD: CollectionPage + ItemList (top-12). No AggregateRating —
  // site-reviews-only rule (area pages carry no site reviews).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    url: `${baseUrl}/areas/${area.slug}`,
    description: `${area.count} verified businesses serving ${area.displayName}, UAE.`,
    inLanguage: 'en-AE',
    mainEntity: {
      '@type': 'ItemList',
      name: `${pageTitle} - directory`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: area.vendors.length,
      itemListElement: area.vendors.map((v, i) => ({
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
            { label: 'Areas', href: '/areas' },
            { label: area.displayName },
          ]}
        />

        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed md:text-lg">
            {area.count} verified business{area.count === 1 ? '' : 'es'} in the
            directory actively serve {area.displayName} — find{' '}
            {area.topCategories.slice(0, 3).map((c) => c.name.toLowerCase()).join(', ')}{' '}
            and more nearby, and contact any of them directly by phone or
            WhatsApp. No middlemen, no quotes platform.
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Showing the top {area.vendors.length} of {area.count} — verified
            businesses and top-rated first.
          </p>
        </header>

        {/* Category chips: real data (services actually present in this area) */}
        {area.topCategories.length > 0 && (
          <nav
            aria-label={`Service categories available in ${area.displayName}`}
            className="mb-8 flex flex-wrap gap-2"
          >
            {area.topCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="rounded-full border border-border-soft bg-brass-fog px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-brass"
              >
                {c.name} in {area.displayName}{' '}
                <span className="text-text-muted">({c.count})</span>
              </Link>
            ))}
          </nav>
        )}

        {area.vendors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {area.vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-muted">
            We're onboarding providers in this area — check back soon.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center md:mt-14">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 rounded-xl bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-bone"
          >
            Browse the full directory
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 rounded-xl border border-border-soft px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass"
          >
            All service areas
          </Link>
        </div>
      </div>
    </main>
  );
}
