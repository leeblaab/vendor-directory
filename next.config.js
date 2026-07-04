/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Directus already handles image optimization via URL parameters
    // We disable Next.js optimization to avoid the "private IP" block for localhost
    unoptimized: true,
  },
};

module.exports = nextConfig;