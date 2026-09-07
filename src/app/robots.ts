import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Production-safe default (matches SITE_URL in @/lib/sitemap) so the
  // `Sitemap:` line never points at localhost if NEXT_PUBLIC_SITE_URL is unset.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.easyfinder.ae';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/login',
          '/register',
          '/submit',
          '/search',
          // Add any future user dashboard or profile paths here
          // '/dashboard', 
          // '/profile',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}