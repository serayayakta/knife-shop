"use client";

import Link from "next/link";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";

export default function ProductSection() {
  const { products, loading, error } = useAdminProducts();

  const preview = products.slice(0, 10);

  return (
    <section className="bg-gray-900 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🗡 Products</h2>
        <div className="flex gap-3">
          <Link
            href="/admin/add-product"
            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/view-products"
            className="text-sm text-blue-400 hover:underline"
          >
            View All
          </Link>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-400">Loading products...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && preview.length === 0 && (
        <p className="text-sm text-gray-400">No products available.</p>
      )}

      <ul className="space-y-2">
        {preview.map((product) => (
          <li key={product.id} className="border-b border-gray-700 pb-2">
            <span className="font-medium">{product.name}</span>{" "}
            <span className="text-sm text-gray-400">
              (${product.discountedPrice ?? product.originalPrice})
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
