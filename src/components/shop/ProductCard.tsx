import Image from "next/image";

type ProductCardProps = {
  name: string;
  price: number;
  discountedPrice?: number;
  imageUrl?: string;
};

export default function ProductCard({
  name,
  price,
  discountedPrice,
  imageUrl = "/images/knife.jpg",
}: ProductCardProps) {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-4 flex flex-col justify-between gap-1">
        <h3 className="text-base font-medium text-gray-900 leading-snug line-clamp-2">
          {name}
        </h3>
        <div className="text-sm mt-1">
          {discountedPrice ? (
            <>
              <span className="line-through text-gray-400 mr-2">${price}</span>
              <span className="text-red-600 font-semibold">
                ${discountedPrice}
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-semibold">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
