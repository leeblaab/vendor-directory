// src/components/CategorySEOText.tsx
import { getCategorySEO } from '@/lib/category-seo-data';

export default function CategorySEOText({ slug }: { slug: string }) {
  const seoData = getCategorySEO(slug);

  if (!seoData) return null;

  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {seoData.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
        {seoData.description}
      </p>
    </section>
  );
}