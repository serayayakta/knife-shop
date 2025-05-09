"use client";

import { Order } from "@/services/admin/orders";

interface OrderPreviewListProps {
  orders: Order[];
}

export default function OrderPreviewList({ orders }: OrderPreviewListProps) {
  return (
    <ul className="space-y-3">
      {orders.slice(0, 10).map((order) => (
        <li
          key={order.id}
          className="border border-gray-700 p-3 rounded text-white"
        >
          <div className="text-sm font-medium">Order #{order.id.slice(-6)}</div>
          <div className="text-xs text-gray-400">
            {order.orderDate ?? "No date"} — {order.orderStatus ?? "No status"}
          </div>
          <div className="text-xs text-gray-300">
            ${order.totalAmount ?? "N/A"} —{" "}
            {order.shippingAddress ?? "No address"}
          </div>
        </li>
      ))}
    </ul>
  );
}
