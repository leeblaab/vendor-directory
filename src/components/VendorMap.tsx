'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Vendor, Category } from '@/lib/directus';

// Fix Leaflet's default marker icon issue with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type VendorWithCategory = Vendor & { category: Category };

// Component to update map bounds when vendors change
function MapUpdater({ vendors }: { vendors: VendorWithCategory[] }) {
  const map = useMap();

  useEffect(() => {
    const validVendors = vendors.filter(
      (v) => v.latitude && v.longitude
    );

    if (validVendors.length === 0) {
      // Default to UAE center
      map.setView([24.4539, 54.3773], 7);
      return;
    }

    if (validVendors.length === 1) {
      map.setView([validVendors[0].latitude!, validVendors[0].longitude!], 13);
      return;
    }

    // Fit bounds to show all vendors
    const bounds = L.latLngBounds(
      validVendors.map((v) => [v.latitude!, v.longitude!])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [vendors, map]);

  return null;
}

interface VendorMapProps {
  vendors: VendorWithCategory[];
  height?: string;
  className?: string;
}

export default function VendorMap({ 
  vendors, 
  height = '500px',
  className = ''
}: VendorMapProps) {
  const vendorsWithLocation = vendors.filter(
    (v) => v.latitude && v.longitude
  );

  // UAE center coordinates
  const uaeCenter: [number, number] = [24.4539, 54.3773];

  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${className}`} style={{ height }}>
      <MapContainer
        center={uaeCenter}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater vendors={vendorsWithLocation} />
        
        {vendorsWithLocation.map((vendor) => (
          <Marker
            key={vendor.id}
            position={[vendor.latitude!, vendor.longitude!]}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-bold text-sm mb-1">{vendor.name}</h3>
                <p className="text-xs text-gray-600 mb-2">
                  {typeof vendor.category === 'object' 
                    ? vendor.category.name 
                    : `Category ${vendor.category}`}
                </p>
                {vendor.phone && (
                  <a
                    href={vendor.whatsapp_link || `tel:${vendor.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600"
                  >
                    📱 Contact
                  </a>
                )}
                <a
                  href={`/vendors/${vendor.slug}`}
                  className="inline-block ml-2 bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}