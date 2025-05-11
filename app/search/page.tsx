"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchKnives } from "@/hooks/useSearchKnives";
import { useCategories } from "@/hooks/useCategories";
import MainLayout from "@/components/layout/MainLayout";
import ProductList from "@/components/shop/ProductList";

function SearchContent() {
  const params = useSearchParams();
  const searchTerm = params.get("searchTerm") || undefined;
  const categoryId = params.get("categoryId") || undefined;

  const {
    data: knives,
    isLoading,
    isError,
  } = useSearchKnives({
    searchTerm,
    categoryId,
  });

  const { data: categories } = useCategories();
  const matchedCategory = categoryId
    ? categories?.find((cat) => String(cat.categoryId) === categoryId)
    : null;

  return (
    <MainLayout>
      {/* 🔍 Filter Info */}
      <div className="mb-4 space-y-1">
        {!searchTerm && !categoryId && (
          <p className="text-sm text-gray-700">Showing all knives</p>
        )}
        {searchTerm && (
          <p className="text-sm text-gray-700">
            Search for: <span className="font-semibold">{searchTerm}</span>
          </p>
        )}
        {matchedCategory && (
          <p className="text-sm text-gray-700">
            Filtered by:{" "}
            <span className="font-semibold">
              {matchedCategory.categoryName}
            </span>
          </p>
        )}
      </div>

      {/* 🔄 Loading & Errors */}
      {isLoading && <p>Loading knives...</p>}
      {isError && <p>Failed to load knives.</p>}

      {/* 🗂 Results */}
      {knives && knives.length > 0 ? (
        <ProductList products={knives} />
      ) : (
        !isLoading && (
          <p className="text-gray-500">
            {searchTerm || categoryId
              ? "No products found for your filters."
              : "No products available."}
          </p>
        )
      )}
    </MainLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
