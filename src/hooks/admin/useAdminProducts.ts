import { useEffect, useState } from "react";
import { addProduct, AddProductPayload } from "@/services/admin/products";
import { fetchKnives, Knife } from "@/services/knife";

export function useAdminProducts() {
  const [products, setProducts] = useState<Knife[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const data = await fetchKnives();
      setProducts(data);
    } catch {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (payload: AddProductPayload) => {
    return await addProduct(payload);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct: handleAddProduct,
    reload: loadProducts,
  };
}
