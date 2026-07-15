import { Metadata } from 'next';
import HomeClient from './HomeClient';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import RippleLink from '@/components/RippleLink';
import BoidsEcosystem from '@/components/animata/background/boids-ecosystem'; 

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
            {/* Boids Ecosystem Background */}
            <div className="absolute inset-0 z-0">
              <BoidsEcosystem />
            </div>

            {/* Optional: Overlay for better text readability */}
            <div className="absolute inset-0 bg-[#176B87]/40 z-0 pointer-events-none" />

            {/* Content - z-10 to appear above background */}
            <div className="relative z-10">
              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                Find Trusted Local Service Providers
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
                Discover reliable professionals across the UAE for plumbing, electrical work, cleaning, and more.
              </p>

              {/* Global Search Bar */}
              <div className="max-w-2xl mx-auto mb-8 px-4">
                <SearchBar />
              </div>

              {/* Buttons Container */}
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

        {/* Client Component with Dynamic Content */}
        <HomeClient />

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 pb-4 border-t border-[#B4D4FF]">
          © {new Date().getFullYear()} EasyFinder UAE. All rights reserved.
        </footer>
      </div>
    </main>
  );
}