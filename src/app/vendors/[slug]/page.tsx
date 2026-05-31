import { getVendorBySlug } from '@/lib/directus';
import { notFound } from 'next/navigation';

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);
  if (!vendor) notFound();

  // Format WhatsApp link safely
  const phoneClean = vendor.phone.replace(/\D/g, '');
  const waLink = `https://wa.me/${phoneClean.startsWith('971') ? phoneClean : '971' + phoneClean.slice(1)}`;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
          {vendor.verified && (
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              ✅ Verified
            </span>
          )}
        </div>
        
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700">
          {vendor.category.icon && <span>{vendor.category.icon}</span>}
          {vendor.category.name}
        </span>
      </div>

      <p className="text-gray-600 leading-relaxed">{vendor.description}</p>

      {/* Service Areas */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Serves</h3>
        <div className="flex flex-wrap gap-2">
          {typeof vendor.service_areas === 'string'
            ? JSON.parse(vendor.service_areas).map((area: string) => (
                <span key={area} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-sm rounded-md capitalize">
                  {area}
                </span>
              ))
            : null}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-center transition"
        >
          💬 Chat on WhatsApp
        </a>
        <a
          href={`tel:${vendor.phone}`}
          className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg text-center transition"
        >
          📞 Call Directly
        </a>
      </div>
    </main>
  );
}