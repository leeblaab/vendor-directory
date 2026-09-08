export type Hub = {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  slugPreview: string[];
  moreSlugs: string[];
};

/*
 * Hub ↔ category map. Every slug is a REAL live /categories/[slug] route
 * (verified against api.easyfinder.ae, 2026-09-08: 60 slugs, all hyphens).
 * 6 hubs · 60 slugs · zero orphan links · zero 404s.
 */
export const HUBS: Hub[] = [
  {
    id: 'home-living',
    name: 'Home & Living',
    tagline: 'Fix, clean, comfort, and moving for every home in the Emirates.',
    icon: '🏠',
    slugPreview: ['plumbers', 'electricians', 'ac-repair-maintenance'],
    moreSlugs: [
      'cleaning-services', 'pest-control', 'carpenters', 'curtain-installers',
      'furniture-assembly', 'locksmith', 'appliance-repair', 'landscaping',
      'water-tank-cleaning', 'tv-mounting-installation', 'swimming-pool-maintenance',
      'solar-panel-installation', 'smart-home-installation', 'generator-repair',
      'elevator-maintenance',
    ],
  },
  {
    id: 'build-fitout',
    name: 'Build & Fit-Out',
    tagline: 'From blueprint to final coat — the full construction & interior chain.',
    icon: '🔨',
    slugPreview: ['general-contractor', 'painters', 'interior-designer'],
    moreSlugs: [
      'masons-bricklayers', 'aluminum-glass-works', 'gypsum-false-ceiling',
      'tile-marble-workers', 'welding-services', 'security-systems-cctv',
    ],
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    tagline: 'Salons, grooming, body-care, and fitness across the Gulf.',
    icon: '💇',
    slugPreview: ['salons-beauty', 'barbers', 'makeup-artists'],
    moreSlugs: ['massage-therapists', 'personal-trainers'],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    tagline: 'Mechanics, detailing, AC, tires, wash — the full car service line-up.',
    icon: '🚗',
    slugPreview: ['garage-car-repair', 'car-detailing', 'car-ac-repair'],
    moreSlugs: ['car-electrical', 'car-tinting', 'car-wash', 'car-rentals', 'tire-shop', 'driving-instructors'],
  },
  {
    id: 'events-weddings',
    name: 'Events & Weddings',
    tagline: 'Planners, caterers, photographers, florists — the full celebration team.',
    icon: '🎉',
    slugPreview: ['event-planners', 'wedding-planners', 'catering-services'],
    moreSlugs: ['bakeries', 'photographers', 'videographers', 'flower-shops', 'gift-shops'],
  },
  {
    id: 'business-tech',
    name: 'Business & Tech',
    tagline: 'IT, digital, and everything that keeps SMEs moving in the UAE market.',
    icon: '💼',
    slugPreview: ['it-support', 'web-designers', 'digital-marketing'],
    moreSlugs: [
      'internet-cable-installation', 'document-clearing-pro', 'signage-branding',
      'translation-services', 'tutors-private-teachers', 'junk-removal',
      'movers', 'packers-movers',
    ],
  },
];

export const ALL_SLUGS: string[] = HUBS.flatMap(h => [...h.slugPreview, ...h.moreSlugs]);
export const HUB_COUNTS: Record<string, number> = Object.fromEntries(
  HUBS.map(h => [h.id, h.slugPreview.length + h.moreSlugs.length]),
);
export const SLUG_TO_HUB: Record<string, string> = Object.fromEntries(
  HUBS.flatMap(h => [...h.slugPreview, ...h.moreSlugs].map(s => [s, h.id])),
);

export function slugLabel(slug: string): string {
  return slug.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
