"use client";

import Image from "next/image";
import { useCart } from "@/context/CartProvider";

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
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      originalPrice,
      discountedPrice,
      quantity: 1,
    });
  };

  return (
    <div className="w-full max-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
      {/* 📸 Product Image */}
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={"/images/knife.jpg"}
          alt={name}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* 📦 Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-medium text-gray-900 leading-snug line-clamp-2">
          {name}
        </h3>

        {/* 💲 Price Section */}
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

        {/* 🛒 Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-orange-700 text-white text-sm py-2 px-4 rounded hover:bg-orange-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
