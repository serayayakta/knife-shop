"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";

function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useCategories();

  const selectedCategoryId = searchParams.get("categoryId");
  const currentSearch = searchParams.get("searchTerm") || "";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (selectedCategoryId) params.set("categoryId", selectedCategoryId);
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId: number) => {
    const params = new URLSearchParams();
    params.set("categoryId", categoryId.toString());
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    router.push(`/search?${params.toString()}`);
  };

  const visibleCategories = categories?.slice(0, 5) || [];
  const overflowCategories = categories?.slice(5) || [];

  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      {/* 🗂 Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        {visibleCategories.map((cat) => {
          const isActive = selectedCategoryId === String(cat.categoryId);

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.categoryId)}
              className={`text-sm rounded px-3 py-1 transition ${
                isActive
                  ? "bg-orange-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat.categoryName}
            </button>
          );
        })}

        {overflowCategories.length > 0 && (
          <div className="relative z-10">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 transition"
            >
              Other Categories
            </button>
            {expanded && (
              <div className="absolute bg-white shadow-md rounded mt-2 p-2 w-44">
                {overflowCategories.map((cat) => {
                  const isActive =
                    selectedCategoryId === String(cat.categoryId);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.categoryId)}
                      className={`block text-left w-full text-sm px-2 py-1 rounded transition ${
                        isActive
                          ? "bg-orange-700 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {cat.categoryName}
                    </button>
                  );
                })}
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

// ✅ Suspense wrapper directly around the component — no extra indirection
export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
