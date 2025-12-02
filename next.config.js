/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  // Forward cookies to backend
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : 'http://localhost:3001/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

