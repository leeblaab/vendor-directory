/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '206.189.50.71',
        port: '8055',
        pathname: '/assets/**',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;