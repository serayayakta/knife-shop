export interface KnifeInOrder {
  id: string;
  name: string;
  discountPrice: number;
  price: number;
  imageUrl?: string;
}

export interface OrderStatus {
  orderStatusText: string;
  orderStatusCode: number;
}

export interface Order {
  id: string;
  orderDate: string | null;
  orderStatus: OrderStatus | null;
  shippingAddress: string | null;
  billingAddress: string | null;
  totalAmount: number | null;
  knife: KnifeInOrder[] | null;
  history?: string;
  userName?: string;
  userSurname?: string;
  email?: string;
  phoneNumber?: string;
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const res = await fetch(
      "https://blade-commerce.onrender.com/api/orders/getAllOrders"
    );
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  } catch {
    return [];
  }
}
