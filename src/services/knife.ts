// 👇 Types returned by backend
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

// 👇 Frontend usable type
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

function mapKnife(knife: ApiKnife): Knife {
  return {
    id: knife.id,
    name: knife.name,
    categoryId: knife.categoryId,
    description: knife.description,
    originalPrice: knife.price,
    discountedPrice:
      knife.discountPrice === -1 ? undefined : knife.discountPrice,
    stockQuantity: knife.stockQuantity,
    tags: knife.tags,
    imageUrl: knife.imageUrl,
    knifeDetails: knife.knifeDetails,
  };
}

export async function fetchKnives(): Promise<Knife[]> {
  const res = await fetch("/api/knives");
  if (!res.ok) throw new Error("Failed to fetch knives");
  const data: ApiKnife[] = await res.json();

  return data.map(mapKnife);
}

interface SearchParams {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  knifeType?: string;
  bladeMaterial?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  size?: number;
}

export const searchKnives = async (params: SearchParams): Promise<Knife[]> => {
  const {
    searchTerm,
    categoryId,
    minPrice,
    maxPrice,
    knifeType,
    bladeMaterial,
    sortDirection,
    page = 1,
    size = 12,
  } = params;

  const query = new URLSearchParams();

  if (searchTerm) query.append("searchTerm", searchTerm);
  if (categoryId) query.append("categoryId", categoryId);
  if (minPrice) query.append("minPrice", minPrice.toString());
  if (maxPrice) query.append("maxPrice", maxPrice.toString());
  if (knifeType) query.append("knifeType", knifeType);
  if (bladeMaterial) query.append("bladeMaterial", bladeMaterial);
  if (sortDirection) query.append("sortDirection", sortDirection);
  query.append("page", page.toString());
  query.append("size", size.toString());

  const res = await fetch(`/api/knives/search?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch knives with filters");

  const data: ApiKnife[] = await res.json();
  return data.map(mapKnife); // ✅ ADD THIS LINE TO MAP FIELDS
};

export type Category = {
  id: string;
  categoryId: number;
  categoryName: string;
};

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}
