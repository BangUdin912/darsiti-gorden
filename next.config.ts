import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/product",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/product/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;