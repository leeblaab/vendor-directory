/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // P0 canonical fix: pin the trailing-slash policy. Both the vendor canonical and the
  // sitemap already generate NO-SLASH urls and match live, but the key was previously
  // unmanaged (implicit default). Declaring it explicitly protects the canonical/sitemap
  // agreement — if this ever flipped to true, live URLs and sitemap URLs would diverge.
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '206.189.50.71',
        port: '8055',
        pathname: '/assets/**',
      },
          {
      protocol: 'https',
      hostname: 'api.easyfinder.ae',
      pathname: '/assets/**',
    },
    ],
    unoptimized: false, // ✅ Enable optimization!
  },
};

module.exports = nextConfig;