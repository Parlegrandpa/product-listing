import ProductDetail from "@/components/ProductDetail";
import { Suspense } from "react";

export interface ProductSearchParam {
  searchParams: string;
}

const Product = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <Suspense fallback={<p>Loading product details...</p>}>
        <ProductDetail />
      </Suspense>
    </div>
  );
};

export default Product;
