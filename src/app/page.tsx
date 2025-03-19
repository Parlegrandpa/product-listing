"use client";

import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "../data/query";

export default function Home() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.products.map((product) => (
            <div key={product.id} className="group">
              <ProductCard
                id={product.id}
                thumbnail={product.thumbnail}
                title={product.title}
                description={product.description}
                price={{ currency: "£", amount: 200 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
