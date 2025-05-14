"use client";

import Image from "next/image";
import { Knife } from "@/services/knife";
import { useState } from "react";

interface ProductDetailProps {
  knife: Knife;
}

export default function ProductDetail({ knife }: ProductDetailProps) {
  const [fallback, setFallback] = useState(false);

  const displayImage =
    !fallback && knife.imageUrl ? knife.imageUrl : "/images/knife.jpg";

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
      {/* 🖼 Image */}
      <div className="relative w-full aspect-square rounded overflow-hidden border">
        <Image
          src={displayImage}
          alt={knife.name}
          fill
          className="object-cover"
          onError={() => setFallback(true)}
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* 📋 Info */}
      <div className="space-y-4 text-gray-800">
        <h1 className="text-2xl font-bold">{knife.name}</h1>

        <p className="text-sm text-gray-600">{knife.description}</p>

        <div className="text-lg font-semibold text-orange-700">
          {knife.discountedPrice ? (
            <>
              <span className="line-through text-gray-500 mr-2">
                ${knife.originalPrice}
              </span>
              <span>${knife.discountedPrice}</span>
            </>
          ) : (
            <span>${knife.originalPrice}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-4">
          <div>
            <span className="font-medium">Stock:</span> {knife.stockQuantity}
          </div>
          <div>
            <span className="font-medium">Knife Type:</span>{" "}
            {knife.knifeDetails.knifeType || "-"}
          </div>
          <div>
            <span className="font-medium">Blade Length:</span>{" "}
            {knife.knifeDetails.bladeLength} mm
          </div>
          <div>
            <span className="font-medium">Color:</span>{" "}
            {knife.knifeDetails.color || "-"}
          </div>
          <div>
            <span className="font-medium">Blade Material:</span>{" "}
            {knife.knifeDetails.bladeMaterial || "-"}
          </div>
          <div>
            <span className="font-medium">Handle Material:</span>{" "}
            {knife.knifeDetails.handleMaterial || "-"}
          </div>
        </div>

        {knife.tags.length > 0 && (
          <div className="mt-4 text-sm">
            <span className="font-medium text-gray-600">Tags:</span>{" "}
            <span className="text-gray-500">{knife.tags.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
