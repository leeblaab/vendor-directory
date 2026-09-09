import Image from 'next/image';
import Link from 'next/link';
import { Vendor, Category, getLogoUrl } from '@/lib/directus';
import StarRating from './StarRating';

export type RatingData = {
  average: number;
  count: number;
} | null;

function getFirstChar(str: string) {
  if (!str) return '?';
  const chars = Array.from(str.trim());
  const firstChar = chars[0] || '?';
  return /^[\p{L}\p{N}]/u.test(firstChar) ? firstChar : '?';
}

export default function VendorCard({
  vendor,
  ratingData,
}: {
  vendor: Vendor & { category: Category };
  ratingData?: RatingData;
}) {
  const logoUrl = getLogoUrl(vendor.logo);

  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group relative bg-white rounded-2xl p-0.5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border-soft hover:border-brass focus:outline-none focus:ring-2 focus:ring-brass/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brass-fog via-white to-verified-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

      <div className="relative z-10 bg-white rounded-2xl p-5">
        <div className="flex items-start gap-4">
          {logoUrl ? (
            <div className="relative">
              <Image
                src={logoUrl}
                alt={vendor.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl object-cover bg-bone flex-shrink-0 border-2 border-border-soft group-hover:border-brass transition-colors"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-ink flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {getFirstChar(vendor.name)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-semibold text-ink truncate group-hover:text-brass-deep transition-colors duration-200">
                {vendor.name}
              </h3>
              {vendor.verified && (
                <span className="material-symbols-outlined text-verified text-base flex-shrink-0">
                  verified
                </span>
              )}
            </div>

            {ratingData && (
              <div className="mb-2">
                <StarRating
                  rating={ratingData.average}
                  size="sm"
                  showValue
                  reviewCount={ratingData.count}
                />
              </div>
            )}

            {vendor.google_review_rating && vendor.google_review_count && vendor.google_review_count > 0 && (
              <div className="flex items-center gap-1 text-xs text-text-muted mb-2">
                <span className="material-symbols-outlined text-sm text-brass">star</span>
                <span className="font-medium">{Number(vendor.google_review_rating).toFixed(1)}</span>
                <span>({vendor.google_review_count} Google reviews)</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-text-muted">
              <span className="material-symbols-outlined text-brass text-base">
                {vendor.category.icon}
              </span>
              <span>{vendor.category.name}</span>
            </div>

            {vendor.description && (
              <p className="text-sm text-text-muted line-clamp-2 mb-3">
                {vendor.description}
              </p>
            )}

            {vendor.phone && (
              <div className="flex items-center gap-1.5 text-xs text-text-faint">
                <span className="material-symbols-outlined text-sm">call</span>
                {vendor.phone}
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}
