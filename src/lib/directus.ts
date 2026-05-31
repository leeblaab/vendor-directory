import { createDirectus, rest, readItems } from '@directus/sdk';

export const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest());

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
};

export type Vendor = {
  id: number;
  name: string;
  slug: string;
  category: Category | number;
  phone: string;
  whatsapp_link: string;
  service_areas: string[] | string;
  description: string;
  verified: boolean;
  status: 'draft' | 'published' | 'pending';
};

// Fetch single vendor by slug (published only)
export async function getVendorBySlug(slug: string) {
  const vendors = await directus.request<Vendor & { category: Category }>(
    readItems('vendors', {
      filter: { slug: { _eq: slug } },
      fields: [
        '*',
        'category.id',
        'category.name',
        'category.slug',
        'category.icon',
      ],
      limit: 1,
    })
  );

  return vendors?.[0] || null;
}
