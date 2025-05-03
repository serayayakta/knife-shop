"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/add-product" className="text-blue-600 underline">
            Add Product
          </Link>
        </li>
        {/* Add more features as you build them */}
      </ul>
    </div>
  );
}
