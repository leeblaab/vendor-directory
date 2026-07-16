// src/components/AnalyticsTracker.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Type declaration for Google Tag Manager dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (isProduction && gaId && pathname && typeof window !== 'undefined') {
      // ✅ SAFE: Initialize dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || [];
      
      // ✅ SAFE: Push to dataLayer instead of calling window.gtag directly.
      // GTM will automatically read this event as soon as it lazy-loads.
      window.dataLayer.push({
        event: 'page_view',
        page_path: pathname,
      });
    }
  }, [pathname, gaId, isProduction]);

  return null;
}