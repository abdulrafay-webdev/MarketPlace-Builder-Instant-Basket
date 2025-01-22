import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.sanity.io'], // Sanity CDN domain
  },
  reactStrictMode: true,
};

export default nextConfig;
