"use client";

import ProductDetail from "@/components/ProductDetail";
import { fetchProductById } from "@/data/query";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export interface ProductSearchParam {
  searchParams: string;
}

const Product = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProductById(productId || ""),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {products?.product && <ProductDetail data={products.product} />}
    </div>
  );
};

export default Product;
