/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "194.87.98.104",
        port: "8001",
        pathname: "/interiorImages/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/entranceImages/**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
