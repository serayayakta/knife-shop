"use client";

import { useSearchParams } from "next/navigation";
import { useSearchKnives } from "@/hooks/useSearchKnives";
import MainLayout from "@/components/layout/MainLayout";
import ProductList from "@/components/shop/ProductList";

export default function SearchPage() {
  const params = useSearchParams();
  const searchTerm = params.get("searchTerm") || undefined;
  const categoryId = params.get("categoryId") || undefined;

  const {
    data: knives,
    isLoading,
    isError,
  } = useSearchKnives({ searchTerm, categoryId });

  return (
    <MainLayout>
      <div className="mb-4">
        {searchTerm && (
          <p className="text-sm text-gray-700">
            Search results for:{" "}
            <span className="font-medium">{searchTerm}</span>
          </p>
        )}
      </div>

      {isLoading && <p>Loading knives...</p>}
      {isError && <p>Failed to load knives.</p>}

      {knives && knives.length > 0 ? (
        <ProductList products={knives} />
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </MainLayout>
  );
}
