"use client";

import { useState } from "react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🛒 Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-600 hover:text-black transition"
      >
        🛒
      </button>

      {/* 🛍️ Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 📦 Drawer */}
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

        <div className="p-4 text-gray-500">
          <p>Your cart is empty.</p>
        </div>
      </div>
    </>
  );
}
