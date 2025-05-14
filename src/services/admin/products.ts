export interface AddProductPayload {
  imageFile: File;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  tags: string[];
  knifeType: string;
  bladeLength: number;
  color: string;
  bladeMaterial: string;
  handleMaterial: string;
}

export async function addProduct(
  payload: AddProductPayload
): Promise<{ success: boolean; message?: string }> {
  const formData = new FormData();

  formData.append("imageFile", payload.imageFile);
  formData.append("name", payload.name);
  formData.append("categoryId", String(payload.categoryId));
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));
  formData.append("discountPrice", String(payload.discountPrice));
  formData.append("stockQuantity", String(payload.stockQuantity));
  payload.tags.forEach((tag) => formData.append("tags", tag));
  formData.append("knifeType", payload.knifeType);
  formData.append("bladeLength", String(payload.bladeLength));
  formData.append("color", payload.color);
  formData.append("bladeMaterial", payload.bladeMaterial);
  formData.append("handleMaterial", payload.handleMaterial);

  try {
    const res = await fetch(
      "https://blade-commerce.onrender.com/api/knives/addKnife",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message || "Add product failed" };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Network error while adding product" };
  }
}

export interface UpdateProductPayload {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  tags: string[];
  imageUrl?: string; // if image is not changed, reuse the existing URL
  knifeType: string;
  bladeLength: number;
  color: string;
  bladeMaterial: string;
  handleMaterial: string;
}

export async function updateProduct(
  payload: UpdateProductPayload
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(
      "https://blade-commerce.onrender.com/api/knives/updateKnife",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message || "Update failed" };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Network error while updating product" };
  }
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(
      `https://blade-commerce.onrender.com/api/knives/deleteKnife?id=${id}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message || "Delete failed" };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Network error while deleting product" };
  }
}
