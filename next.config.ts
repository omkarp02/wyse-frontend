import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      }
    ],
    domains: ['picsum.photos', 'nobero.com', 'i.imgur.com'],
  },
};

export default nextConfig;
