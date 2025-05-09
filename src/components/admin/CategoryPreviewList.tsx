"use client";

interface CategoryPreviewListProps {
  categories: { id: string; categoryName: string }[];
}

export default function CategoryPreviewList({
  categories,
}: CategoryPreviewListProps) {
  return (
    <ul className="space-y-1">
      {categories.slice(0, 10).map((cat) => (
        <li
          key={cat.id}
          className="text-sm text-white border-b border-gray-800 py-1"
        >
          {cat.categoryName}
        </li>
      ))}
    </ul>
  );
}
