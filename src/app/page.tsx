// src/app/page.tsx
import { Metadata } from 'next';
import HomeClient from './HomeClient';
import SearchBar from '@/components/SearchBar';
import RippleLink from '@/components/RippleLink';

// Incremental Static Regeneration: Cache this page for 60 seconds
// This drastically reduces TTFB by serving from Vercel's edge cache
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'EasyFinder UAE - Find Trusted Local Service Providers',
  description: 'Discover 17,000+ verified service providers across the UAE. Plumbers, electricians, AC repair, cleaning, and more. Contact directly via WhatsApp.',
  keywords: ['UAE', 'service providers', 'plumbers', 'electricians', 'AC repair', 'Dubai', 'Abu Dhabi', 'Sharjah', 'home services'],
  authors: [{ name: 'EasyFinder UAE' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae'),
  openGraph: {
    title: 'EasyFinder UAE - Find Trusted Local Service Providers',
    description: 'Discover 17,000+ verified service providers across the UAE. Contact directly via WhatsApp.',
    url: 'https://www.easyfinder.ae',
    siteName: 'EasyFinder UAE',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EasyFinder UAE - Find Trusted Service Providers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyFinder UAE',
    description: 'Discover 1000+ verified service providers across the UAE.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EEF5FF] via-white to-[#B4D4FF]">
      <div className="max-w-6xl mx-auto space-y-12 px-4 py-8">
        
        {/* Hero Section */}
        <section className="relative text-center py-16 md:py-24 bg-gradient-to-br from-[#176B87] to-[#86B6F6] text-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Lightweight CSS-only animated background (Zero JS main-thread cost) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#176B87]/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_50%,rgba(118,108,177,0.15),transparent_80%)] animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(134,182,246,0.1)_0%,transparent_50%)]"></div>
          </div>

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-[#176B87]/40 z-0 pointer-events-none" />

          {/* Content - z-10 to appear above background */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Find Trusted Local Service Providers
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Discover reliable professionals across the UAE for plumbing, electrical work, cleaning, and more.
            </p>

            {/* Global Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 px-4">
              <SearchBar />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <RippleLink href="/categories">
                Browse Categories
              </RippleLink>

              <RippleLink href="/submit">
                List your business
              </RippleLink>
            </div>
          </div>
        </section>

        {/* Client Component with Dynamic Content (Categories, Maps, etc.) */}
        <HomeClient />

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 pb-4 border-t border-[#B4D4FF]">
          © {new Date().getFullYear()} EasyFinder UAE. All rights reserved.
        </footer>
      </div>
    </main>
  );
}