import ProductSection from "@/components/admin/ProductSection";
import CategorySection from "@/components/admin/CategorySection";
import OrderSection from "@/components/admin/OrderSection";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* 🗃 Product Section */}
      <ProductSection />

      {/* 🗂 Category Section */}
      <CategorySection />

      {/* 📦 Orders Section */}
      <OrderSection />
    </div>
  );
}
