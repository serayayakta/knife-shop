// 👇 Backend response shape (what API returns)
type ApiKnife = {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  price: number; // -> becomes originalPrice
  discountPrice?: number; // -> becomes discountedPrice
  stockQuantity: number;
  tags: string[];
  imageUrl: string;
  knifeDetails: {
    knifeType: string;
    bladeLength: number;
    color: string;
    bladeMaterial: string;
    handleMaterial: string;
  };
};

// 👇 Frontend type (what the app expects)
export type Knife = {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  originalPrice: number;
  discountedPrice?: number;
  stockQuantity: number;
  tags: string[];
  imageUrl: string;
  knifeDetails: {
    knifeType: string;
    bladeLength: number;
    color: string;
    bladeMaterial: string;
    handleMaterial: string;
  };
};

export async function fetchKnives(): Promise<Knife[]> {
  const res = await fetch("/api/knives");

  if (!res.ok) throw new Error("Failed to fetch knives");

  const data: ApiKnife[] = await res.json();

  return data.map((knife) => ({
    id: knife.id,
    name: knife.name,
    categoryId: knife.categoryId,
    description: knife.description,
    originalPrice: knife.price,
    discountedPrice: knife.discountPrice,
    stockQuantity: knife.stockQuantity,
    tags: knife.tags,
    imageUrl: knife.imageUrl,
    knifeDetails: knife.knifeDetails,
  }));
}
