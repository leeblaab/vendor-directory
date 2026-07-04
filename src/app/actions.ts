'use server';

import { getCategories, getVendorsPaginated, Category, Vendor } from '@/lib/directus';

export async function fetchCategoriesAction(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories?fields=id,name,slug,icon,category_image.id,category_image.filename_disk&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
        },
        cache: 'no-store'
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch categories');
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchVendorsAction(limit: number): Promise<(Vendor & { category: Category })[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/vendors?fields=id,name,slug,description,logo.id,logo.filename_disk,category.id,category.name&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) throw new Error('Failed to fetch vendors');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    throw error;
  }
}
