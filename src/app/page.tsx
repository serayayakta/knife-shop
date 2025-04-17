"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProductList from "@/components/shop/ProductList";
import { useKnives } from "@/hooks/useKnives";

export default function Home() {
  const { data: knives, isLoading, isError } = useKnives();

  // 🧠 Map API fields to frontend structure
  const mappedKnives = knives?.map((knife) => ({
    id: knife.id,
    name: knife.name,
    originalPrice: knife.originalPrice,
    discountedPrice:
      knife.discountedPrice !== -1 ? knife.discountedPrice : undefined,
    imageUrl: knife.imageUrl,
  }));

  return (
    <MainLayout>
      {isLoading && <p>Loading products...</p>}
      {isError && <p>Failed to load products. Please try again.</p>}
      {mappedKnives && <ProductList products={mappedKnives} />}
    </MainLayout>
  );
}
