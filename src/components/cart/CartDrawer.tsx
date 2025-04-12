"use client";

import { useCart } from "@/context/CartProvider";
import { useState } from "react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-600 hover:text-black transition"
      >
        🛒
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-80 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-4 border-b py-2"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 text-lg bg-gray-100 rounded hover:bg-gray-200"
                  >
                    –
                  </button>
                  <span className="text-sm w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 text-lg bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
