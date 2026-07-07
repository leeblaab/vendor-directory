import Image from 'next/image';
import Link from 'next/link';
import { Vendor, Category, getLogoUrl } from '@/lib/directus';
import StarRating from './StarRating';

// Define the shape of the rating data for easy importing
export type RatingData = {
  average: number;
  count: number;
} | null;

// ✅ Helper function to safely extract first character (fixes hydration error)
function getFirstChar(str: string): string {
  if (!str) return '?';
  
  // Use Array.from to properly handle Unicode/surrogate pairs
  const chars = Array.from(str.trim());
  const firstChar = chars[0] || '?';
  
  // Only return if it's a printable letter or number
  return /^[\p{L}\p{N}]/u.test(firstChar) ? firstChar : '?';
}

export default function VendorCard({ 
  vendor, 
  ratingData 
}: { 
  vendor: Vendor & { category: Category };
  ratingData?: RatingData;
}) {
  const logoUrl = getLogoUrl(vendor.logo);

  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl p-0.5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#86B6F6] focus:outline-none focus:ring-2 focus:ring-[#86B6F6] focus:ring-opacity-50"
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF5FF] via-white to-[#B4D4FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      {/* Card content */}
      <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          {logoUrl ? (
            <div className="relative">
              <Image
                src={logoUrl}
                alt={vendor.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0 border-2 border-[#EEF5FF] group-hover:border-[#86B6F6] transition-colors"
              />
              {/* Subtle overlay effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#86B6F6]/10 to-[#176B87]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#176B87] to-[#86B6F6] flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-sm">
              {getFirstChar(vendor.name)} {/* ✅ Fixed: was vendor.name.charAt(0) */}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#176B87] dark:group-hover:text-[#B4D4FF] transition-colors duration-200">
                {vendor.name}
              </h3>
              {vendor.verified && (
                <span className="material-symbols-outlined text-[#86B6F6] text-base flex-shrink-0">
                  verified
                </span>
              )}
            </div>

            {/* Rating */}
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

            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-blue-600 text-base">
                {vendor.category.icon}
              </span>
              <span>{vendor.category.name}</span>
            </div>

            {vendor.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {vendor.description}
              </p>
            )}

            {vendor.phone && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                <span className="material-symbols-outlined text-sm">call</span>
                {vendor.phone}
              </div>
            )}
          </div>
        </div>
        
        {/* Subtle arrow indicator */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg 
            className="w-4 h-4 text-[#86B6F6]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}