"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";

export default function Navbar() {
  const router = useRouter();
  const { data: categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/search?categoryId=${categoryId}`);
  };

  const visibleCategories = categories?.slice(0, 5) || []; // Show first 5 for now
  const overflowCategories = categories?.slice(5) || [];

  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      {/* 🔥 Brand */}
      <div className="text-xl font-bold text-orange-700">Kesik Bıçakçılık</div>

      {/* 🗂 Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        {visibleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.categoryId)}
            className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 transition"
          >
            {cat.categoryName}
          </button>
        ))}

        {overflowCategories.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 transition"
            >
              Other Categories
            </button>
            {expanded && (
              <div className="absolute bg-white shadow-md rounded mt-2 p-2 w-40">
                {overflowCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.categoryId)}
                    className="block text-left w-full text-sm hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    {cat.categoryName}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🔍 Search */}
      <div className="flex items-center gap-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          type="text"
          placeholder="Search knives..."
          className="px-3 py-1 text-sm border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-700 text-white text-sm px-3 py-1 rounded hover:bg-orange-800"
        >
          Search
        </button>
      </div>
    </div>
  );
}
