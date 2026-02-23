/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "i.imgur.com", "img.youtube.com", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    formats: ["image/avif", "image/webp"],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_KEY: process.env.ADMIN_KEY,
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 60 * 5,
    },
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
