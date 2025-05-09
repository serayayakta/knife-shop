"use client";

import Link from "next/link";
import { useAdminCategories } from "@/hooks/admin/useAdminCategories";

export default function CategorySection() {
  const { categories, loading, error } = useAdminCategories();

  const preview = categories.slice(0, 10);

  return (
    <section className="bg-gray-900 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📁 Categories</h2>
        <div className="flex gap-3">
          <Link
            href="/admin/add-category"
            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            + Add Category
          </Link>
          <Link
            href="/admin/view-categories"
            className="text-sm text-blue-400 hover:underline"
          >
            View All
          </Link>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-gray-400">Loading categories...</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && preview.length === 0 && (
        <p className="text-sm text-gray-400">No categories available.</p>
      )}

      <ul className="space-y-2">
        {preview.map((cat) => (
          <li key={cat.id} className="border-b border-gray-700 pb-2">
            <span className="font-medium">{cat.categoryName}</span>
            <span className="text-sm text-gray-400 ml-2">
              (#{cat.categoryId})
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
