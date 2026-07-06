import { getVendorBySlug, getRelatedVendors, getLogoUrl, getReviewsByVendor, getVendorAverageRating } from '@/lib/directus';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButton from '@/components/ShareButton';
import ContactCard from '@/components/ContactCard';
import RelatedVendors from '@/components/RelatedVendors';
import StarRating from '@/components/StarRating';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import type { Metadata } from 'next';
import LocationMap from '@/components/LocationMap';

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
      title: 'Vendor Not Found - ServiceFinder UAE',
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

  // ✅ FIXED: Use production URL, not localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';
  const vendorUrl = `${baseUrl}/vendors/${slug}`;
  const logoUrl = getLogoUrl(vendor.logo);
  const categoryName = typeof vendor.category === 'object' ? vendor.category.name : 'Service Provider';

  // Build description for SEO
  const description = vendor.description 
    ? vendor.description.slice(0, 160).replace(/\n/g, ' ')
    : `Contact ${vendor.name}, a trusted ${categoryName} in the UAE. ${vendor.verified ? 'Verified business.' : 'Find phone, WhatsApp, and service areas.'}`;

  return {
    title: `${vendor.name} - ${categoryName} in ${serviceAreas[0] || 'UAE'} | ServiceFinder`,
    description,
    alternates: {
      canonical: vendorUrl,
    },
    openGraph: {
      title: vendor.name,
      description,
      url: vendorUrl,
      siteName: 'ServiceFinder UAE',
      type: 'website',
      locale: 'en_AE',
      images: logoUrl ? [{ url: logoUrl, width: 800, height: 600, alt: vendor.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: vendor.name,
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
  
  // ✅ FIXED: Fetch vendor ONCE, then chain dependent calls
  const vendor = await getVendorBySlug(slug);
  
  if (!vendor) notFound();

  // Now fetch related data in parallel (only after we have the vendor)
  const [relatedVendors, reviews, ratingData] = await Promise.all([
    getRelatedVendors(slug, typeof vendor.category === 'object' ? vendor.category.id : vendor.category, 3),
    getReviewsByVendor(vendor.id),
    getVendorAverageRating(vendor.id),
  ]);

  // Format WhatsApp link
  let waLink = vendor.whatsapp_link || '';
  if (!waLink && vendor.phone) {
    const phoneClean = vendor.phone.replace(/\D/g, '');
    waLink = `https://wa.me/${phoneClean.startsWith('971') ? phoneClean : '971' + phoneClean.slice(1)}`;
  }

  // Parse service areas
  let serviceAreas: string[] = [];
  try {
    serviceAreas = typeof vendor.service_areas === 'string'
      ? JSON.parse(vendor.service_areas)
      : vendor.service_areas || [];
  } catch {
    serviceAreas = [];
  }

  // Build contact items
  const contactItems = [];
  if (waLink) {
    contactItems.push({
      icon: 'chat',
      label: 'WhatsApp',
      value: 'Chat Now',
      href: waLink,
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40',
    });
  }
  if (vendor.phone) {
    contactItems.push({
      icon: 'call',
      label: 'Phone',
      value: vendor.phone,
      href: `tel:${vendor.phone}`,
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40',
    });
  }
  if (vendor.email) {
    contactItems.push({
      icon: 'mail',
      label: 'Email',
      value: vendor.email,
      href: `mailto:${vendor.email}`,
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40',
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
      color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40',
    });
  }

  const logoUrl = getLogoUrl(vendor.logo);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';
  const categoryName = typeof vendor.category === 'object' ? vendor.category.name : 'Service Provider';
  const vendorUrl = `${baseUrl}/vendors/${slug}`;

  // ✅ ENHANCED: Build comprehensive JSON-LD structured data
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
    // Geo coordinates for better local SEO
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
    // Aggregate rating
    aggregateRating: ratingData ? {
      '@type': 'AggregateRating',
      ratingValue: ratingData.average,
      reviewCount: ratingData.count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    // Individual reviews (top 3)
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
    // External links
    ...(vendor.website && { sameAs: [vendor.website] }),
    // Category
    category: categoryName,
    // Service type
    serviceType: categoryName,
  };

  // ✅ NEW: BreadcrumbList schema
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
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { 
            label: categoryName, 
            href: `/vendors?category=${typeof vendor.category === 'object' ? vendor.category.slug : ''}` 
          },
          { label: vendor.name },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Logo */}
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${vendor.name} - ${categoryName} logo`}
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-200 dark:border-gray-700"
              priority
              itemProp="image"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {vendor.name.charAt(0)}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white" itemProp="name">
                    {vendor.name}
                  </h1>
                  {vendor.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Verified
                    </span>
                  )}
                </div>

                {/* Rating Display */}
                {ratingData && (
                  <div className="mt-2 flex items-center gap-3">
                    <StarRating
                      rating={ratingData.average}
                      size="md"
                      showValue
                      reviewCount={ratingData.count}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {typeof vendor.category === 'object' && vendor.category.icon && <span>{vendor.category.icon}</span>}
                    {categoryName}
                  </span>
                  {serviceAreas.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
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

      {/* Contact Card */}
      <div className="mb-6">
        <ContactCard items={contactItems} />
      </div>

      {/* About Section */}
      {vendor.description && (
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            About
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line" itemProp="description">
            {vendor.description}
          </p>
        </section>
      )}

      {/* Service Areas */}
      {serviceAreas.length > 0 && (
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">map</span>
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area: string) => (
              <span
                key={area}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg border border-blue-100 dark:border-blue-800 capitalize"
              >
                <span className="material-symbols-outlined text-sm">location_on</span>
                {area}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Location Map Section */}
      {vendor.latitude && vendor.longitude && (
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">location_on</span>
            Location
          </h2>
          
          {/* The Map */}
          <LocationMap
            latitude={vendor.latitude}
            longitude={vendor.longitude}
            vendorName={vendor.name}
          />
          
          {/* Action Links */}
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={`https://www.google.com/maps?q=${vendor.latitude},${vendor.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              Open in Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${vendor.latitude},${vendor.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              <span className="material-symbols-outlined text-base">directions</span>
              Get Directions
            </a>
          </div>
        </section>
      )}

      {/* Notes (internal, optional display) */}
      {vendor.notes && (
        <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">sticky_note_2</span>
            Additional Notes
          </h2>
          <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
            {vendor.notes}
          </p>
        </section>
      )}

      {/* Reviews Section */}
      <section className="mb-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">rate_review</span>
              Customer Reviews
              {ratingData && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({ratingData.count} {ratingData.count === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </h2>
            {ratingData && (
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {ratingData.average.toFixed(1)}
                </span>
                <StarRating rating={ratingData.average} size="sm" />
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Write a Review
            </h3>
            <ReviewForm vendorId={vendor.id} />
          </div>

          {/* Reviews List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {reviews.length > 0 ? `All Reviews (${reviews.length})` : 'No Reviews Yet'}
            </h3>
            <ReviewList reviews={reviews} vendorId={vendor.id} />
          </div>
        </div>
      </section>

      {/* Related Vendors */}
      <RelatedVendors 
        vendors={relatedVendors} 
        categoryName={categoryName} 
      />
    </main>
  );
}