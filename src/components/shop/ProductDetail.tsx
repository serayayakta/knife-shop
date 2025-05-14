"use client";

import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { useState } from "react";
import { Knife } from "@/services/knife";

type ProductDetailProps = {
  product: Knife;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [fallback, setFallback] = useState(false);

  const {
    id,
    name,
    originalPrice,
    discountedPrice,
    imageUrl,
    description,
    knifeDetails,
    stockQuantity,
  } = product;

  const displayImage = !fallback && imageUrl ? imageUrl : "/images/knife.jpg";

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 aspect-[3/2]">
          <Image
            src={displayImage}
            alt={name}
            fill
            className="object-cover rounded"
            onError={() => setFallback(true)}
            unoptimized
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-600">{description}</p>
          <p className="text-sm text-gray-500">Stok: {stockQuantity}</p>

          <div className="text-lg mt-2">
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
            onClick={handleAddToCart}
            className="bg-orange-700 text-white mt-4 py-2 px-4 rounded hover:bg-orange-800 transition"
          >
            Add to Cart
          </button>

          {/* Details */}
          <div className="mt-4 text-sm text-gray-700">
            {knifeDetails.knifeType && (
              <div>Type: {knifeDetails.knifeType}</div>
            )}
            {knifeDetails.bladeMaterial && (
              <div>Blade: {knifeDetails.bladeMaterial}</div>
            )}
            {knifeDetails.handleMaterial && (
              <div>Handle: {knifeDetails.handleMaterial}</div>
            )}
            {knifeDetails.color && <div>Color: {knifeDetails.color}</div>}
            {knifeDetails.bladeLength > 0 && (
              <div>Length: {knifeDetails.bladeLength} mm</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
