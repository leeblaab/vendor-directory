import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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