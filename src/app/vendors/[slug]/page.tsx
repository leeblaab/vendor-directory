import { getVendorBySlug, getRelatedVendors, getLogoUrl, getReviewsByVendor, getVendorAverageRating } from '@/lib/directus';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButton from '@/components/ShareButton';
import ContactCard from '@/components/ContactCard';
import RelatedVendors from '@/components/RelatedVendors';
import StarRating from '@/components/StarRating';
import { VendorViewTracker } from '@/components/VendorViewTracker';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import type { Metadata } from 'next';
import LocationMap from '@/components/LocationMap';
import Link from 'next/link';

export const revalidate = 300; // Revalidate every 5 minutes

// ============ SEO METADATA GENERATION ============

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    return {
      title: 'Vendor Not Found - EasyFinder UAE',
    };
  }

  // Parse service areas for address
  let serviceAreas: string[] = [];
  try {
    serviceAreas = typeof vendor.service_areas === 'string'
      ? JSON.parse(vendor.service_areas)
      : vendor.service_areas || [];
  } catch {
    serviceAreas = [];
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';
  const vendorUrl = `${baseUrl}/vendors/${slug}`;
  const logoUrl = getLogoUrl(vendor.logo);
  const categoryName = typeof vendor.category === 'object' ? vendor.category.name : 'Service Provider';

  // Word-boundary description, capped at 158 total chars (never mid-word, no word-overflow truncation).
  const rawDescription = vendor.description
    ? vendor.description.replace(/\n/g, ' ')
    : `Contact ${vendor.name}, a trusted ${categoryName} in the UAE. ${vendor.verified ? 'Verified business.' : 'Find phone, WhatsApp, and service areas.'}`;
  const description = rawDescription.length > 158
    ? rawDescription.slice(0, 155).replace(/[\s.]+$/, '') + '...'
    : rawDescription;

  // P0 title-length fix: truncate vendor.name to 45 chars (append "..." when it exceeds)
  // so the composed title stays in the SEO-safe range. Applied to title + og_title.
  const vendorTitleName =
    vendor.name.length > 45
      ? vendor.name.slice(0, 45).trimEnd() + '...'
      : vendor.name;

  return {
    title: `${vendorTitleName} – ${categoryName} | EasyFinder UAE`,
    description,
    alternates: {
      canonical: vendorUrl,
    },
    openGraph: {
      title: `${vendorTitleName} – ${categoryName} | EasyFinder UAE`,
      description,
      url: vendorUrl,
      siteName: 'EasyFinder UAE',
      type: 'website',
      locale: 'en_AE',
      images: logoUrl ? [{ url: logoUrl, width: 800, height: 600, alt: vendor.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${vendorTitleName} – ${categoryName} | EasyFinder UAE`,
      description,
      images: logoUrl ? [logoUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

// ============ PAGE COMPONENT ============

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const vendor = await getVendorBySlug(slug);
  if (!vendor) notFound();

  const [relatedVendors, reviews, ratingData] = await Promise.all([
    getRelatedVendors(slug, typeof vendor.category === 'object' ? vendor.category.id : vendor.category, 3),
    getReviewsByVendor(vendor.id),
    getVendorAverageRating(vendor.id),
  ]);

  let waLink = vendor.whatsapp_link || '';
  if (!waLink && vendor.phone) {
    const phoneClean = vendor.phone.replace(/\D/g, '');
    waLink = `https://wa.me/${phoneClean.startsWith('971') ? phoneClean : '971' + phoneClean.slice(1)}`;
  }

  let serviceAreas: string[] = [];
  try {
    serviceAreas = typeof vendor.service_areas === 'string'
      ? JSON.parse(vendor.service_areas)
      : vendor.service_areas || [];
  } catch {
    serviceAreas = [];
  }

  const contactItems = [];
  if (waLink) {
    contactItems.push({
      icon: 'chat',
      label: 'WhatsApp',
      value: 'Chat Now',
      href: waLink,
      color: 'bg-verified/10 border-verified/25 text-verified hover:bg-verified/20',
    });
  }
  if (vendor.phone) {
    contactItems.push({
      icon: 'call',
      label: 'Phone',
      value: vendor.phone,
      href: `tel:${vendor.phone}`,
      color: 'bg-ink/[0.04] border-ink/15 text-ink hover:bg-ink/[0.08]',
    });
  }
  if (vendor.email) {
    contactItems.push({
      icon: 'mail',
      label: 'Email',
      value: vendor.email,
      href: `mailto:${vendor.email}`,
      color: 'bg-brass/[0.08] border-brass/30 text-brass-deep hover:bg-brass/[0.14]',
    });
  }
  if (vendor.website) {
    contactItems.push({
      icon: 'language',
      label: 'Website',
      value: (() => {
        try {
          return new URL(vendor.website).hostname.replace('www.', '');
        } catch {
          return vendor.website;
        }
      })(),
      href: vendor.website,
      color: 'bg-ink/[0.04] border-ink/15 text-ink hover:bg-ink/[0.08]',
    });
  }

  const logoUrl = getLogoUrl(vendor.logo);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';
  const categoryName = typeof vendor.category === 'object' ? vendor.category.name : 'Service Provider';
  const vendorUrl = `${baseUrl}/vendors/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': vendorUrl,
    name: vendor.name,
    description: vendor.description || `${vendor.name} - ${categoryName} in UAE`,
    url: vendorUrl,
    telephone: vendor.phone || undefined,
    email: vendor.email || undefined,
    image: logoUrl || undefined,
    logo: logoUrl || undefined,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: serviceAreas[0] || 'UAE',
      addressLocality: serviceAreas[0] || 'UAE',
    },
    ...(vendor.latitude && vendor.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: vendor.latitude,
        longitude: vendor.longitude,
      },
    }),
    areaServed: serviceAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    aggregateRating: ratingData && ratingData.count > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: Math.round(ratingData.average * 10) / 10,
      reviewCount: ratingData.count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    // Strict validator policy: only emit `review` when we have real site reviews.
    // This keeps the schema "clean" for vendors with zero reviews (the 19k case).
    // NOTE: Google's `aggregateRating` requirement is that the source is
    // "your site's own users" — Google reviews are NOT a valid source and will
    // trigger strict-validation errors. Do NOT "fix" this by pointing at
    // vendor.google_review_rating/google_review_count without shipping Phase 3.1
    // (vendor review ingestion) so the data source is legitimately our own.
    ...(reviews.length > 0 && {
      review: reviews.slice(0, 3).map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: typeof review.user === 'object' 
            ? `${review.user.first_name} ${review.user.last_name || ''}`.trim()
            : 'Verified Customer',
        },
        datePublished: review.created_at,
        reviewBody: review.comment,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    }),
    ...(vendor.website && { sameAs: [vendor.website] }),
    category: categoryName,
    serviceType: categoryName,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `${baseUrl}/vendors?category=${typeof vendor.category === 'object' ? vendor.category.slug : ''}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: vendor.name,
        item: vendorUrl,
      },
    ],
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8" itemScope itemType="https://schema.org/LocalBusiness">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Phase 2.2: fires the 'vendor_view' custom GA4 event once on mount */}
      <VendorViewTracker key={vendor.name} vendorName={vendor.name} vendorCategory={categoryName} />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: categoryName, href: `/vendors?category=${typeof vendor.category === 'object' ? vendor.category.slug : ''}` },
          { label: vendor.name },
        ]}
      />

      <div className="bg-white border border-ink/10 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${vendor.name} - ${categoryName} logo`}
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-bone flex-shrink-0 border border-ink/10"
              priority
              itemProp="image"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-ink to-ink-soft flex items-center justify-center text-brass text-3xl font-bold flex-shrink-0">
              {vendor.name.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-ink" itemProp="name">
                    {vendor.name}
                  </h1>
                  {vendor.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-verified bg-verified-soft rounded-full">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Verified
                    </span>
                  )}
                </div>

                {ratingData && (
                  <div className="mt-2 flex items-center gap-3">
                    <StarRating rating={ratingData.average} size="md" showValue reviewCount={ratingData.count} />
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Link
                    href={`/vendors?category=${typeof vendor.category === 'object' ? vendor.category.slug : ''}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brass-soft text-brass-deep text-sm font-medium hover:bg-brass/20 transition-colors"
                  >
                    {typeof vendor.category === 'object' && vendor.category.icon && <span>{vendor.category.icon}</span>}
                    {categoryName}
                  </Link>
                  {serviceAreas.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-sm text-ink/60">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      {serviceAreas.slice(0, 3).join(', ')}
                      {serviceAreas.length > 3 && ` +${serviceAreas.length - 3}`}
                    </span>
                  )}
                </div>
              </div>
              <ShareButton vendorName={vendor.name} vendorUrl={`/vendors/${slug}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <ContactCard items={contactItems} vendorName={vendor.name} vendorCategory={categoryName} />
      </div>

      {vendor.description && (
        <section className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-ink/55 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            About
          </h2>
          <p className="text-ink/75 leading-relaxed whitespace-pre-line" itemProp="description">
            {vendor.description}
          </p>
        </section>
      )}

      {serviceAreas.length > 0 && (
        <section className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-ink/55 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">map</span>
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area: string) => (
              <span key={area} className="inline-flex items-center gap-1 px-3 py-1.5 bg-ink/[0.04] text-ink/80 text-sm rounded-lg border border-ink/15 capitalize">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {area}
              </span>
            ))}
          </div>
        </section>
      )}

      {vendor.latitude && vendor.longitude && (
        <section className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-ink/55 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">location_on</span>
            Location
          </h2>
          <LocationMap latitude={vendor.latitude} longitude={vendor.longitude} vendorName={vendor.name} />
          <div className="mt-4 flex flex-wrap gap-4">
            <a href={`https://www.google.com/maps?q=${vendor.latitude},${vendor.longitude}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-brass-deep hover:text-brass transition-colors">
              <span className="material-symbols-outlined text-base">open_in_new</span>
              Open in Google Maps
            </a>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${vendor.latitude},${vendor.longitude}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-verified hover:text-ink transition-colors">
              <span className="material-symbols-outlined text-base">directions</span>
              Get Directions
            </a>
          </div>
        </section>
      )}

      {vendor.notes && (
        <section className="bg-brass/[0.06] border border-brass/30 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-brass-deep uppercase tracking-wide mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">sticky_note_2</span>
            Additional Notes
          </h2>
          <p className="text-ink/75 text-sm leading-relaxed">
            {vendor.notes}
          </p>
        </section>
      )}

      {/* ✅ NEW: Google Rating Section */}
      {vendor.google_review_rating && vendor.google_review_count && vendor.google_review_count > 0 && (
        <section className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <span className="material-symbols-outlined text-brass">star</span>
              Google Rating
            </h2>
            {vendor.website && (
              <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-brass-deep hover:underline flex items-center gap-1">
                View on Google Maps
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-ink">
              {Number(vendor.google_review_rating).toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className={`material-symbols-outlined text-2xl ${
                      star <= Math.round(Number(vendor.google_review_rating)) 
                        ? 'text-brass' 
                        : 'text-ink/15'
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink/55 mt-1">
                Based on {vendor.google_review_count} Google reviews
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mb-6">
        <div className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <span className="material-symbols-outlined text-brass">rate_review</span>
              Customer Reviews
              {ratingData && (
                <span className="text-sm font-normal text-ink/55">
                  ({ratingData.count} {ratingData.count === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </h2>
            {ratingData && (
              <div className="flex items-center gap-2 bg-ink/[0.05] px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold text-ink">
                  {ratingData.average.toFixed(1)}
                </span>
                <StarRating rating={ratingData.average} size="sm" />
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-ink mb-4">Write a Review</h3>
            <ReviewForm vendorId={vendor.id} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-ink mb-4">
              {reviews.length > 0 ? `All Reviews (${reviews.length})` : 'No Reviews Yet'}
            </h3>
            <ReviewList reviews={reviews} vendorId={vendor.id} />
          </div>
        </div>
      </section>

      <RelatedVendors vendors={relatedVendors} categoryName={categoryName} />
    </main>
  );
}