import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/knives",
        destination:
          "https://blade-commerce.onrender.com/api/knives/getAllKnives",
      },
      {
        source: "/api/knives/search",
        destination: "https://blade-commerce.onrender.com/api/knives/search",
      },
      {
        source: "/api/knives/:id",
        destination:
          "https://blade-commerce.onrender.com/api/knives/getKnifeById?id=:id",
      },
      {
        source: "/api/categories",
        destination:
          "https://blade-commerce.onrender.com/api/categories/getAllCategories",
      },
    ];
  },
};

export default nextConfig;
