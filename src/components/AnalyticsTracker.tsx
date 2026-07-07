'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

// Analytics Tracker Component for client-side navigation
export function AnalyticsTracker() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (isProduction && gaId && pathname && typeof window !== 'undefined') {
      // Track page view
      window.gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId, isProduction]);

  return null;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}