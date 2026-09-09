// src/components/CategorySEOText.tsx
import { getCategorySEO } from '@/lib/category-seo-data';

export default function CategorySEOText({ slug }: { slug: string }) {
  const seoData = getCategorySEO(slug);

  if (!seoData) return null;

  return (
    <section className="border border-ink/10 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-ink mb-3">
        {seoData.title}
      </h2>
      <p className="text-ink/60 leading-relaxed text-sm sm:text-base">
        {seoData.description}
      </p>
    </section>
  );
}