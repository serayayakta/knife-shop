"use client";

import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import { useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* 🧭 Header */}
      <header className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1
              onClick={() => router.push("/")}
              className="text-xl font-bold text-orange-700 tracking-wide cursor-pointer hover:opacity-80 transition"
            >
              Kesik Bıçakçılık
            </h1>
            <CartDrawer />
          </div>

          {/* ➡️ Navbar inside same block */}
          <Navbar />
        </div>
      </header>

      {/* 📄 Page Content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
