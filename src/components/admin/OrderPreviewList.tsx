"use client";

import { Order } from "@/services/admin/orders";
import Image from "next/image";

interface OrderPreviewListProps {
  orders: Order[];
}

export default function OrderPreviewList({ orders }: OrderPreviewListProps) {
  return (
    <ul className="space-y-3">
      {orders.slice(0, 10).map((order) => (
        <li
          key={order.id}
          className="border border-gray-700 p-4 rounded text-white bg-gray-800"
        >
          <div className="flex justify-between items-center text-sm font-medium mb-1">
            <span>Order #{order.id.slice(-6)}</span>
            <span className="text-gray-300">
              {order.orderStatus?.orderStatusText || "No status"}
            </span>
          </div>

          <div className="text-xs text-gray-400 mb-1">
            {order.orderDate ?? "No date"} —{" "}
            {order.shippingAddress ?? "No address"}
          </div>

          <div className="text-xs text-gray-400 mb-1">
            {order.userName} {order.userSurname} — {order.phoneNumber}
          </div>

          <div className="text-xs text-gray-300 mb-2">
            Total: ${order.totalAmount ?? "N/A"}
          </div>

          {/* 🖼 Image from first knife in order */}
          {order.knife?.[0]?.imageUrl && (
            <div className="relative w-full h-32 rounded overflow-hidden">
              <Image
                src={order.knife[0].imageUrl}
                alt="knife"
                fill
                className="object-cover"
                onError={(e) => (e.currentTarget.src = "/images/knife.jpg")}
                unoptimized
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
