'use client';

import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const MapWrapper = dynamic(
  () => import('./SingleLocationMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    )
  }
);

interface LocationMapProps {
  latitude: number;
  longitude: number;
  vendorName: string;
}

export default function LocationMap(props: LocationMapProps) {
  return <MapWrapper {...props} />;
}