import ProductCard from "./ProductCard";

type Product = {
  id: string; // ✅ required for cart logic to work
  name: string;
  price: number;
  discountedPrice?: number;
  imageUrl?: string;
};

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
      {products.map((product) => (
        <ProductCard
          key={product.id} // ✅ key should also use stable id
          id={product.id}
          name={product.name}
          price={product.price}
          discountedPrice={product.discountedPrice}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
}
