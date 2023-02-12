/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_URL,
        port: process.env.NEXT_PUBLIC_API_PORT,
        pathname: "/interiorImages/**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_URL,
        port: process.env.NEXT_PUBLIC_API_PORT,
        pathname: "/entranceImages/**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
