"use client";

import Link from "next/link";
import { useAdminOrders } from "@/hooks/admin/useAdminOrders";

export default function OrderSection() {
  const { orders, loading } = useAdminOrders();
  const preview = orders.slice(0, 10);

  return (
    <section className="bg-gray-900 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📦 Orders</h2>
        <Link
          href="/admin/view-orders"
          className="text-sm text-blue-400 hover:underline"
        >
          View All
        </Link>
      </div>

      {loading && <p className="text-sm text-gray-400">Loading orders...</p>}

      {!loading && preview.length === 0 && (
        <p className="text-sm text-gray-400">No orders found.</p>
      )}

      <ul className="space-y-2">
        {preview.map((order) => (
          <li key={order.id} className="border-b border-gray-700 pb-2">
            <div className="flex justify-between">
              <span className="font-medium">#{order.id.slice(-6)}</span>
              <span className="text-sm text-gray-400">
                {order.orderStatus?.orderStatusText ?? "Unknown status"}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {order.orderDate ?? "No date"}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
