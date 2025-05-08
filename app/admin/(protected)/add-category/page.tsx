"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/services/admin/categories";

export default function AddCategoryPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get("categoryName") as string;

    const result = await addCategory({ categoryName });
    setIsLoading(false);

    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setMessage(result.message || "Error adding category.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📁 Add New Category
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label htmlFor="categoryName" className="block text-sm mb-1">
            Category Name
          </label>
          <input
            id="categoryName"
            name="categoryName"
            type="text"
            required
            placeholder="e.g. Outdoor Knives"
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 hover:bg-blue-700 transition-colors py-2 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-red-400 text-sm text-center">{message}</p>
      )}
    </div>
  );
}
