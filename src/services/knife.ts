export type Knife = {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  discountPrice: number;
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
  const res = await fetch("/api/knives"); // ← LOCAL now

  if (!res.ok) throw new Error("Failed to fetch knives");

  return res.json();
}
