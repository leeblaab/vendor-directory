// src/lib/analytics.ts

// Type declaration for Google Tag Manager dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    // Initialize dataLayer if it doesn't exist yet
    window.dataLayer = window.dataLayer || [];
    
    // Push the pageview event. GTM will capture this as soon as it loads.
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  }
};

// Optional: Add a generic event tracker for future use (e.g., button clicks)
export const trackEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      category,
      label,
      value,
    });
  }
};