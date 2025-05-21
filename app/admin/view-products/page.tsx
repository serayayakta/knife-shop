"use client";

import { useState, useMemo } from "react";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";
import Image from "next/image";
import Link from "next/link";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function AdminViewProductsPage() {
  const { products, loading, error, deleteProduct, reload } =
    useAdminProducts();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const filteredItems = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
      case "name-asc":
        return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...filteredItems].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...filteredItems].sort(
          (a, b) =>
            (a.discountedPrice ?? a.originalPrice) -
            (b.discountedPrice ?? b.originalPrice)
        );
      case "price-desc":
        return [...filteredItems].sort(
          (a, b) =>
            (b.discountedPrice ?? b.originalPrice) -
            (a.discountedPrice ?? a.originalPrice)
        );
      case "stock-asc":
        return [...filteredItems].sort(
          (a, b) => a.stockQuantity - b.stockQuantity
        );
      case "stock-desc":
        return [...filteredItems].sort(
          (a, b) => b.stockQuantity - a.stockQuantity
        );
      default:
        return filteredItems;
    }
  }, [search, sort, products]);

  const handleDelete = async () => {
    if (!confirmId) return;
    await deleteProduct(confirmId);
    setConfirmId(null);
    reload();
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧾 All Products</h1>

      {/* 🔍 Search + Sort */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full sm:w-1/3 px-3 py-2 bg-gray-800 border border-gray-600 text-white text-sm rounded"
        >
          <option value="">Sort by</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="price-asc">Price Low–High</option>
          <option value="price-desc">Price High–Low</option>
          <option value="stock-asc">Stock Low–High</option>
          <option value="stock-desc">Stock High–Low</option>
        </select>
      </div>

      {/* ⚠️ State Handling */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 📋 Table */}
      {!loading && filtered.length > 0 ? (
        <div className="overflow-x-auto border border-gray-700 rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left">Image</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-700 hover:bg-gray-900 transition"
                >
                  <td className="px-3 py-2">
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <Image
                        src={product.imageUrl || "/images/knife.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2">{product.name}</td>
                  <td className="px-3 py-2 text-center">
                    {product.discountedPrice ? (
                      <>
                        <span className="line-through text-gray-400 mr-1">
                          ${product.originalPrice}
                        </span>
                        <span className="text-red-500 font-medium">
                          ${product.discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span>${product.originalPrice}</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {product.stockQuantity}
                  </td>
                  <td className="px-3 py-2 text-center space-x-2">
                    <Link
                      href={`/admin/edit-product/${product.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => setConfirmId(product.id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-400 mt-4">No products found.</p>
      )}

      {/* 🧾 Confirm Dialog */}
      <ConfirmDialog open={!!confirmId} onClose={() => setConfirmId(null)}>
        <div className="text-sm">
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setConfirmId(null)}
              className="px-4 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </ConfirmDialog>
    </div>
  );
}
