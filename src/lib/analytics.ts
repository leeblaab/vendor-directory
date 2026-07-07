export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}