// Fires the GA4 'vendor_view' custom event once per mounted vendor page.
// Client component because it runs on client after mount; the parent vendor
// page (server) passes plain strings so serialization is trivial.
'use client';

import { useEffect } from 'react';
import { track } from '@/lib/track';

interface VendorViewTrackerProps {
  vendorName: string;
  vendorCategory?: string | null;
}

export function VendorViewTracker({ vendorName, vendorCategory }: VendorViewTrackerProps) {
  useEffect(() => {
    track('vendor_view', {
      vendor_name: vendorName,
      vendor_category: vendorCategory || undefined,
    });
    // Fire exactly once per mount (re-mount happens on nav to a different
    // vendor via key={vendor.name} from the server page).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
