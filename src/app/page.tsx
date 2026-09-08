import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import HubGrid from '@/components/HubGrid';
import EliteMarquee from '@/components/EliteMarquee';
import TrustEngine from '@/components/TrustEngine';
import { HUBS, ALL_SLUGS } from '@/lib/hub-data';
import { getEliteVendors } from '@/lib/directus';

export const metadata: Metadata = {
  title: 'Find Trusted, Verified Service Providers in the UAE',
  description: `Trusted, verified, local. ${ALL_SLUGS.length} real service categories across the 7 Emirates — from plumbers and AC to salons, auto, events, and business. Every contact human-verified.`,
};

export default async function Home() {
  // Elite rail never blocks the page — if the API is cold, we just skip the rail.
  const elite = await getEliteVendors(8);

  return (
    <div className="min-h-screen bg-bone font-sans text-ink">
      <HeroSection />
      <HubGrid hubs={HUBS} />
      <EliteMarquee vendors={elite} />
      <TrustEngine />
    </div>
  );
}
