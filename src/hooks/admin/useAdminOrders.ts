// src/hooks/admin/useAdminOrders.ts
import { useEffect, useState } from "react";
import { getAllOrders, Order } from "@/services/admin/orders";

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(() => {
        setOrders([]);
        setError("Failed to fetch orders.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
}
