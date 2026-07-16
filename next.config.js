/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
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