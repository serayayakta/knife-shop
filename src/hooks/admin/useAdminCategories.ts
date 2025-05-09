import { useEffect, useState } from "react";
import { addCategory, AddCategoryPayload } from "@/services/admin/categories";
import { fetchCategories, Category } from "@/services/knife";

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (payload: AddCategoryPayload) => {
    return await addCategory(payload);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory: handleAddCategory,
    reload: loadCategories,
  };
}
