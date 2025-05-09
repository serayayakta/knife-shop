"use client";

import { KnifeInOrder } from "@/services/admin/orders";
import Image from "next/image";
import { useState } from "react";

interface ProductPreviewListProps {
  products: KnifeInOrder[];
}

export default function ProductPreviewList({
  products,
}: ProductPreviewListProps) {
  return (
    <ul className="divide-y divide-gray-800">
      {products.slice(0, 10).map((product) => (
        <li key={product.id} className="py-2 flex items-center gap-3">
          <ImageWrapper url={product.imageUrl} alt={product.name} />
          <div className="flex flex-col">
            <span className="font-medium text-white">{product.name}</span>
            <span className="text-sm text-gray-400">
              ${product.discountPrice || product.price}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ImageWrapper({ url, alt }: { url?: string; alt: string }) {
  const [fallback, setFallback] = useState(false);
  const displayUrl = !fallback && url ? url : "/images/knife.jpg";

  return (
    <div className="w-14 h-10 relative shrink-0 rounded overflow-hidden bg-gray-700">
      <Image
        src={displayUrl}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setFallback(true)}
        unoptimized
      />
    </div>
  );
}
