import { BACKEND_URL } from "@/lib/medusa";
import { ProductDetailResponse, ProductsResponse } from "../types/types";

const medusaHeader = {
  "Content-Type": "application/json",
  "x-publishable-api-key":
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
    "",
};

const url = `${BACKEND_URL}/store/products`;

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(url, {
    headers: medusaHeader,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const fetchProductById = async (
  id: string
): Promise<ProductDetailResponse> => {
  const response = await fetch(`${url}/${id}`, {
    headers: medusaHeader,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
