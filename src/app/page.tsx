import MainLayout from "@/components/layout/MainLayout";
import ProductList from "@/components/shop/ProductList";

const dummyProducts = [
  {
    id: "knife-1",
    name: "Tactical Blade",
    price: 89.99,
    discountedPrice: 69.99,
  },
  { id: "knife-2", name: "Chef Knife", price: 59.99 },
  {
    id: "knife-3",
    name: "Outdoor Utility",
    price: 74.99,
    discountedPrice: 49.99,
  },
  { id: "knife-4", name: "Compact Folder", price: 49.99 },
  { id: "knife-5", name: "Hunting Edge", price: 94.99, discountedPrice: 79.99 },
  { id: "knife-6", name: "Utility King", price: 39.99 },
];

export default function Home() {
  return (
    <MainLayout>
      <ProductList products={dummyProducts} />
    </MainLayout>
  );
}
