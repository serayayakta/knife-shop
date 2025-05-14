"use client";

import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductCardProps = {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice?: number;
  imageUrl?: string;
};

export default function ProductCard({
  id,
  name,
  originalPrice,
  discountedPrice,
  imageUrl,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [fallback, setFallback] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      originalPrice,
      discountedPrice,
      quantity: 1,
    });
  };

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  const displayImage = !fallback && imageUrl ? imageUrl : "/images/knife.jpg";

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full max-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
    >
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={displayImage}
          alt={name}
          fill
          className="object-cover"
          sizes="100vw"
          onError={() => setFallback(true)}
          unoptimized
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-medium text-gray-900 leading-snug line-clamp-2">
          {name}
        </h3>
        <div className="text-sm">
          {discountedPrice ? (
            <>
              <span className="line-through text-gray-400 mr-2">
                ${originalPrice}
              </span>
              <span className="text-red-600 font-semibold">
                ${discountedPrice}
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-semibold">
              ${originalPrice}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="mt-auto bg-orange-700 text-white text-sm py-2 px-4 rounded hover:bg-orange-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
