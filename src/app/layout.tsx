import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import Header from "@/components/Header";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: {
    default: 'EasyFinder UAE - Find Trusted Local Service Providers',
    template: '%s | EasyFinder UAE',
  },
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <head>
        {/* Preconnect to Directus API to reduce TTFB */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'} />
        {/* Preconnect to Google Fonts domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload the Google Fonts CSS to prevent layout shift (CLS) */}
        <link 
          rel="preload" 
          as="style" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" 
        />
        {/* Load Material Symbols font with media="print" initially, then switch to "all" with JavaScript */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          media="print"
          id="material-symbols-font"
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof document !== 'undefined') {
                  const fontLink = document.getElementById('material-symbols-font');
                  if (fontLink) {
                    fontLink.media = 'all';
                  }
                }
              })();
            `
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
        </noscript>
        
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
          {/* Track page views on client-side navigation */}
          {isProduction && <AnalyticsTracker />}
        </AuthProvider>
      </body>
    </html>
  );
}