import Link from 'next/link';
import Image from 'next/image';
import { Vendor, Category, getLogoUrl } from '@/lib/directus';

interface RelatedVendor {
  id: number;
  name: string;
  slug: string;
  logo: Vendor['logo'];
  verified?: boolean;
  category?: Category;
  service_areas?: string | string[];
}

export default function RelatedVendors({
  vendors,
  categoryName,
}: {
  vendors: RelatedVendor[];
  categoryName: string;
}) {
  if (!vendors || vendors.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Other {categoryName} Near You
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor) => {
          let areas: string[] = [];
          try {
            areas = typeof vendor.service_areas === 'string'
              ? JSON.parse(vendor.service_areas)
              : vendor.service_areas || [];
          } catch {
            areas = [];
          }

          const logoUrl = getLogoUrl(vendor.logo);

          return (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.slug}`}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg dark:hover:shadow-black/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-start gap-3">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={vendor.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {vendor.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {vendor.name}
                    </h3>
                    {vendor.verified && (
                      <span className="material-symbols-outlined text-blue-500 text-base flex-shrink-0">
                        verified
                      </span>
                    )}
                  </div>
                  {areas.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      📍 {areas.slice(0, 2).join(', ')}
                      {areas.length > 2 && ` +${areas.length - 2}`}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}