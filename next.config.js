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
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_KEY: process.env.ADMIN_KEY,
  },
};

module.exports = nextConfig;
