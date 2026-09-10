import type { Metadata } from 'next';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export const metadata: Metadata = {
  // P0 title fix: plain-string title (type-valid in Next 16; a bare { default } is NOT assignable to Metadata.title).
  // No `template:` here — that used to append " | EasyFinder UAE" to every page that ALREADY
  // self-brands, producing the double brand "... | EasyFinder UAE | EasyFinder UAE".
  // Each route page now carries its own single-brand title; title-less pages inherit this fallback.
  title: 'EasyFinder UAE - Find Trusted Local Service Providers',
  description: 'Discover 10,000+ verified service providers across the UAE. Plumbers, electricians, AC repair, cleaning, and more.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae'),
  openGraph: {
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// NOTE: the `font-mono` variable is consumed by globals.css (@theme inline) as --font-mono.
// Clash Display: self-served from Fontshare CDN via head link (same pattern as Material Symbols below).

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', manrope.variable, jetBrainsMono.variable)}
    >
      <head>
        {/* Preconnect to Directus API to reduce TTFB */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'} />
        {/* Preconnect to Google Fonts domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Clash Display (display face) from Fontshare — self-served, no Next optimization dependency */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link rel="preconnect" href="https://fonts.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display&display=swap"
          id="clash-display-font"
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof document !== 'undefined') {
                  const link = document.getElementById('clash-display-font');
                  if (link) { link.media = 'all'; }
                }
              }());
            `,
          }}
        />

        {/* Material Symbols — loaded as a plain, non-JS-depended stylesheet.
            A previous implementation hid the stylesheet behind media="print"
            and flipped it to "all" with an inline JS call, which intermittently
            failed (blocked JS, extensions, hydration races) and left icon
            ligatures like "chevron_right" / "location_on" rendering as raw
            text. A normal <link rel="stylesheet"> has no such race. */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />

        {/* Google Analytics - Production Only with lazyOnload strategy for mobile */}
        {isProduction && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // Consent Mode v2: without an explicit gtag('consent') call BEFORE
                // gtag('config'), consent defaults to DENIED across EEA-like policy
                // and ALL custom events (vendor_view / contact_click /
                // search_impression) queue un-sent while page_view still ships.
                // UAE (no GDPR) — grant defaults so our custom events actually
                // reach GA4. A full cookie banner remains a future phase.
                gtag('consent', 'default', {
                  analytics_storage: 'granted',
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                  wait_for_update: 500,
                });
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          {/* Track page views on client-side navigation */}
          {isProduction && <AnalyticsTracker />}
        </AuthProvider>
      </body>
    </html>
  );
}
