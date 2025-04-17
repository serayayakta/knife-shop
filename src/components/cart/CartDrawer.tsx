"use client";

import { useCart } from "@/context/CartProvider";
import { useState } from "react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQuantity } = useCart();

  const total = items.reduce((acc, item) => {
    const price = item.discountedPrice ?? item.originalPrice;
    return acc + price * item.quantity;
  }, 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-600 hover:text-gray-900 transition"
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
        className={`fixed right-0 top-0 h-full w-1/2 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {items.map((item) => {
                const price = item.discountedPrice ?? item.originalPrice;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-4 border-b border-gray-200 py-2"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <div className="text-sm text-gray-500">
                        {item.discountedPrice ? (
                          <>
                            <span className="line-through mr-1">
                              ${item.originalPrice}
                            </span>
                            <span className="text-red-600 font-semibold">
                              ${item.discountedPrice}
                            </span>
                          </>
                        ) : (
                          <span>${item.originalPrice}</span>
                        )}
                        <span> × {item.quantity}</span>
                        <span className="ml-2">
                          = ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 text-lg bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                      >
                        –
                      </button>
                      <span className="text-sm w-4 text-center text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 text-lg bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
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
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-300 flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
