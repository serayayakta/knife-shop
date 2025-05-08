export interface AddCategoryPayload {
  categoryName: string;
}

export interface AddCategoryResponse {
  success: boolean;
  message?: string;
}

export async function addCategory({
  categoryName,
}: AddCategoryPayload): Promise<AddCategoryResponse> {
  try {
    const query = new URLSearchParams({ categoryName });

    const res = await fetch(
      `https://blade-commerce.onrender.com/api/categories/addCategory?${query.toString()}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message || "Add failed" };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Network error while adding category." };
  }
}
