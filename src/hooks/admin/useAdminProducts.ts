import { useEffect, useState } from "react";
import {
  addProduct,
  AddProductPayload,
  updateProduct,
  UpdateProductPayload,
  deleteProduct,
} from "@/services/admin/products";
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

  const handleUpdateProduct = async (payload: UpdateProductPayload) => {
    return await updateProduct(payload);
  };

  const handleDeleteProduct = async (id: string) => {
    return await deleteProduct(id);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    reload: loadProducts,
  };
}
