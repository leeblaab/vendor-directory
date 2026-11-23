import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getGatedAreas } from '@/lib/areas';

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Service Areas Across the UAE';
  const description =
    'Every neighbourhood and industrial zone in the UAE covered by EasyFinder vendors — see how many verified local businesses serve each area.';
  return {
    title,
    description,
    alternates: { canonical: '/areas' },
    openGraph: {
      title,
      description,
      url: '/areas',
      type: 'website',
      locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function AreasIndexPage() {
  const areas = await getGatedAreas();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Service Areas Across the UAE',
    url: 'https://www.easyfinder.ae/areas',
    description:
      'Index of all UAE service areas covered by EasyFinder vendors.',
    inLanguage: 'en-AE',
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Areas' }]} />

        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Service Areas Across the UAE
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed md:text-lg">
            {areas.length} areas in Dubai, Abu Dhabi, Sharjah, Ajman and across
            the Emirates have at least 10 verified businesses actively serving
            them in our directory. Pick your area to see who can help you —
            plumbers, electricians, AC, cleaning, IT and more.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${encodeURIComponent(area.slug)}`}
              className="rounded-xl border border-border-soft bg-white p-4 shadow-sm transition-all hover:border-brass hover:shadow-md"
            >
              <span className="block text-sm font-semibold text-ink">
                {area.displayName}
              </span>
              <span className="mt-1 block text-xs text-text-muted">
                {area.count} business{area.count === 1 ? '' : 'es'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
