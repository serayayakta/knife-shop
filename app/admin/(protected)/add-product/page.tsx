"use client";

import { FormEvent, useState } from "react";
import { addProduct } from "@/services/admin/products";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("imageFile") as File;

    const payload = {
      imageFile,
      name: formData.get("name") as string,
      categoryId: Number(formData.get("categoryId")),
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      discountPrice: Number(formData.get("discountPrice")),
      stockQuantity: Number(formData.get("stockQuantity")),
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      knifeType: formData.get("knifeType") as string,
      bladeLength: Number(formData.get("bladeLength")),
      color: formData.get("color") as string,
      bladeMaterial: formData.get("bladeMaterial") as string,
      handleMaterial: formData.get("handleMaterial") as string,
    };

    const result = await addProduct(payload);
    setIsLoading(false);

    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setMessage(result.message || "Error adding product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">🛠 Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm mb-1">Product Image</label>
          <input
            name="imageFile"
            type="file"
            accept="image/*"
            required
            className="block w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {[
          { name: "name", label: "Product Name", type: "text", required: true },
          {
            name: "categoryId",
            label: "Category ID",
            type: "number",
            required: true,
          },
          { name: "price", label: "Price", type: "number", required: true },
          { name: "discountPrice", label: "Discount Price", type: "number" },
          {
            name: "stockQuantity",
            label: "Stock Quantity",
            type: "number",
            required: true,
          },
          { name: "tags", label: "Tags (comma separated)", type: "text" },
          { name: "knifeType", label: "Knife Type", type: "text" },
          { name: "bladeLength", label: "Blade Length (mm)", type: "number" },
          { name: "color", label: "Color", type: "text" },
          { name: "bladeMaterial", label: "Blade Material", type: "text" },
          { name: "handleMaterial", label: "Handle Material", type: "text" },
        ].map(({ name, label, type, required }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-600"
            />
          </div>
        ))}

        <div>
          <label htmlFor="description" className="block text-sm mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 hover:bg-blue-700 transition-colors py-2 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-red-400 text-sm text-center">{message}</p>
      )}
    </div>
  );
}
