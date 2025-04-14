import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/knives", // ← your local endpoint
        destination:
          "https://blade-commerce.onrender.com/api/knives/getAllKnives", // ← remote API
      },
    ];
  },
};

export default nextConfig;
