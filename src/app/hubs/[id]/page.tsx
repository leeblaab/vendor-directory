import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCategories, Category } from '@/lib/directus';
import { HUBS, Hub, slugLabel } from '@/lib/hub-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';

// Hub directory — one route per hub (6 hubs). Dynamic like the rest of the
// data pages (categories fetch is revalidate: 0). Unknown id → notFound() 404.

function hubTitle(hub: Hub): string {
  return `${hub.name} in UAE — ${hub.id
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())}`;
}

export async function generateMetadata({
  params,
}: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const hub = HUBS.find((h) => h.id === id);
  if (!hub) return { title: 'Hub Not Found' };
  const n = hub.slugPreview.length + hub.moreSlugs.length;
  const description = `Explore ${n} UAE service categories in the ${hub.name} domain — ${hub.tagline}`;
  return {
    title: hubTitle(hub),
    description,
    alternates: { canonical: `${SITE_URL}/hubs/${hub.id}` },
    openGraph: { title: hubTitle(hub), description, url: `${SITE_URL}/hubs/${hub.id}`, type: 'website', locale: 'en_AE' },
    twitter: { card: 'summary_large_image', title: hubTitle(hub), description },
  };
}

export default async function HubPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hub = HUBS.find((h) => h.id === id);
  if (!hub) notFound();

  const all = [...hub.slugPreview, ...hub.moreSlugs];

  const categories = await getCategories();
  const rows = all.map((slug) => {
    const cat = categories.find((c) => c.slug === slug);
    return {
      slug,
      name: cat?.name || slugLabel(slug),
      icon: cat?.icon,
    };
  });

  // JSON-LD — CollectionPage pointing at the hub directory + its category links.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubTitle(hub),
    url: `${SITE_URL}/hubs/${hub.id}`,
    description: hub.tagline,
    inLanguage: 'en-AE',
    mainEntity: {
      '@type': 'ItemList',
      name: `${hub.name} — categories`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: rows.length,
      itemListElement: rows.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.name,
        url: `${SITE_URL}/categories/${r.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Hubs', href: '/' },
            { label: hub.name },
          ]}
        />

        {/* Hero */}
        <header className="mb-8 md:mb-10">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-bone text-4xl">
              {hub.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {hub.name}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">
                {hub.tagline}
              </p>
              <p className="mt-3 text-sm text-text-muted">
                {rows.length} sub-categories in{' '}
                <span className="font-semibold text-brass-deep">{hub.name}</span>
                {' — '}
                <Link href="/vendors" className="text-brass-deep hover:underline">
                  browse all providers →
                </Link>
              </p>
            </div>
          </div>
        </header>

        {/* Category directory grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <Link
              key={r.slug}
              href={`/categories/${r.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brass hover:shadow-[0_14px_30px_-18px_rgba(199,154,77,0.4)]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bone text-xl"
                aria-hidden="true"
              >
                {r.icon ? (
                  <span className="material-symbols-outlined">{r.icon}</span>
                ) : (
                  '🏷️'
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-base font-semibold text-ink group-hover:text-brass-deep">
                  {r.name}
                </span>
                <span className="mt-1 block text-xs text-text-muted">
                  Explore providers in this category
                </span>
              </span>
              <span
                className="shrink-0 text-brass-deep transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA — hub-level provider list */}
        <div className="mt-10 rounded-2xl border border-ink/10 bg-bone p-6 sm:p-8 md:mt-14">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-ink sm:text-2xl">
                Ready to compare {hub.name} providers?
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                Browse the full UAE directory, filter by service area, rating, or verified status.
              </p>
            </div>
            <Link
              href="/vendors"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-bone transition hover:bg-brass"
            >
              All providers
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
