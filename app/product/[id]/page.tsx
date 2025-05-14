"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getKnifeById } from "@/services/knife";
import ProductDetail from "@/components/product/ProductDetail";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartProvider";

export default function ProductDetailPageWrapper() {
  const { id } = useParams<{ id: string }>();
  const [knife, setKnife] =
    useState<Awaited<ReturnType<typeof getKnifeById>>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getKnifeById(id)
      .then(setKnife)
      .finally(() => setLoading(false));
  }, [id]);

  if (!loading && !knife) return notFound();
  if (loading || !knife) return <p className="p-6 text-sm">Loading...</p>;

  return <ProductDetailPage knife={knife} />;
}

function ProductDetailPage({
  knife,
}: {
  knife: NonNullable<Awaited<ReturnType<typeof getKnifeById>>>;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: knife.id,
      name: knife.name,
      originalPrice: knife.originalPrice,
      discountedPrice: knife.discountedPrice,
      quantity,
    });
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <ProductDetail knife={knife} />

      <div className="mt-6 flex items-center gap-4">
        <label htmlFor="qty" className="text-sm">
          Quantity:
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-16 text-center border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleAddToCart}
          className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800 transition text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
