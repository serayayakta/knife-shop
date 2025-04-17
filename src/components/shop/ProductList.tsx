import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  originalPrice: number;
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
          key={product.id}
          id={product.id}
          name={product.name}
          originalPrice={product.originalPrice}
          discountedPrice={product.discountedPrice}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
}
