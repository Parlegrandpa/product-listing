import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
        port: "",
        // pathname: "/account123/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        port: "",
        // pathname: "/account123/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
