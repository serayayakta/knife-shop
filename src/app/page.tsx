import ProductList from "@/components/shop/ProductList";

const dummyProducts = [
  { name: "Tactical Blade", price: 89.99, discountedPrice: 69.99 },
  { name: "Chef Knife", price: 59.99 },
  { name: "Outdoor Utility", price: 74.99, discountedPrice: 49.99 },
  { name: "Compact Folder", price: 49.99 },
  { name: "Hunting Edge", price: 94.99, discountedPrice: 79.99 },
  { name: "Utility King", price: 39.99 },
];

export default function Home() {
  return (
    <main className="p-4">
      <div className="max-w-7xl mx-auto">
        <ProductList products={dummyProducts} />
      </div>
    </main>
  );
}
