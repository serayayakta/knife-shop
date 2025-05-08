"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Knife = {
  id: string;
  name: string;
  imageUrl?: string;
  discountPrice?: number;
  price: number;
};

type Order = {
  id: string;
  orderDate: string | null;
  orderStatus: string | null;
  shippingAddress: string | null;
  billingAddress: string | null;
  totalAmount: number | null;
  knife: Knife[] | null;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(
          "https://blade-commerce.onrender.com/api/orders/getAllOrders"
        );
        const data = await res.json();
        setOrders(data);
      } catch {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">📦 All Orders</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-md bg-gray-900 border border-gray-700 p-5"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold mr-2">
                  Order ID: {order.id}
                </h2>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-sm text-blue-500 hover:underline text-right"
                >
                  Update Status →
                </Link>
              </div>

              <p className="text-sm text-gray-400">
                <strong>Date:</strong> {order.orderDate || "N/A"} |{" "}
                <strong>Status:</strong> {order.orderStatus || "N/A"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <strong>Shipping:</strong> {order.shippingAddress || "N/A"} |{" "}
                <strong>Billing:</strong> {order.billingAddress || "N/A"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <strong>Total:</strong>{" "}
                {order.totalAmount ? `$${order.totalAmount}` : "N/A"}
              </p>

              {order.knife && order.knife.length > 0 && (
                <div className="mt-4 space-y-4">
                  {order.knife.map((knife) => (
                    <div
                      key={knife.id}
                      className="flex items-center gap-4 bg-gray-800 p-3 rounded"
                    >
                      <OrderKnifeImage src={knife.imageUrl} alt={knife.name} />
                      <div className="text-sm">
                        <p className="font-medium">{knife.name}</p>
                        {knife.discountPrice ? (
                          <p>
                            <span className="line-through text-gray-400 mr-1">
                              ${knife.price}
                            </span>
                            <span className="text-red-500 font-semibold">
                              ${knife.discountPrice}
                            </span>
                          </p>
                        ) : (
                          <p className="text-white font-semibold">
                            ${knife.price}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderKnifeImage({ src, alt }: { src?: string; alt: string }) {
  const [fallback, setFallback] = useState(false);
  const imageSrc = !fallback && src ? src : "/images/knife.jpg";

  return (
    <div className="relative w-20 h-16 shrink-0 rounded overflow-hidden border border-gray-700">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
        onError={() => setFallback(true)}
      />
    </div>
  );
}
