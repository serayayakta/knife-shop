"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProductList from "@/components/shop/ProductList";
import { useKnives } from "@/hooks/useKnives";

export default function Home() {
  const { data: knives, isLoading, isError } = useKnives();

  return (
    <MainLayout>
      {isLoading && <p>Loading products...</p>}
      {isError && <p>Failed to load products. Please try again.</p>}
      {knives && <ProductList products={knives} />}
    </MainLayout>
  );
}
