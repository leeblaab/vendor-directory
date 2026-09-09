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
        <h2 className="text-xl font-bold text-ink">
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
              className="group border border-ink/10 rounded-xl p-4 hover:shadow-lg hover:border-brass/50 transition-all"
            >
              <div className="flex items-start gap-3">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={vendor.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover bg-bone flex-shrink-0 border border-ink/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brass to-brass-deep flex items-center justify-center text-white font-bold flex-shrink-0">
                    {vendor.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-ink truncate group-hover:text-brass transition-colors">
                      {vendor.name}
                    </h3>
                    {vendor.verified && (
                      <span className="material-symbols-outlined text-verified text-base flex-shrink-0">
                        verified
                      </span>
                    )}
                  </div>
                  {areas.length > 0 && (
                    <p className="text-xs text-ink/60 mt-1 truncate">
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