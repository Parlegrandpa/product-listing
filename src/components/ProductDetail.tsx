"use client";

import { useState } from "react";
import { ProductCollection } from "@/types/types";
import { useCart } from "@/context/CartGlobalContext";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/data/query";
import { useSearchParams } from "next/navigation";

export interface ProductDetailProps {
  data: ProductCollection;
}

const ProductDetail = () => {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const {
    data: products,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProductById(productId || ""),
  });

  return (
    products?.product && (
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          {/* Main Image */}
          <div className="w-full">
            <Image
              src={
                products.product.images[selectedImage]?.url ||
                "/assets/placeholder-image.jpg"
              }
              alt="Zip Tote Basket"
              className="w-full h-auto rounded-lg"
              width={500}
              height={900}
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4">
            {products.product.images.map((image, index) => (
              <Image
                key={index}
                src={image.url || "/assets/placeholder-image.jpg"}
                alt={`Thumbnail ${index + 1}`}
                width={500}
                height={900}
                priority
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
          {/* Product Title and Price */}
          <h1 className="text-2xl font-bold text-gray-800">
            {products.product.title}
          </h1>
          <p className="text-xl text-gray-600 mt-2">{`£200`}</p>

          {/* Description */}
          <p className="text-gray-600 mt-4">{products.product.description}</p>

          {/* Add to Bag Button */}
          <div className="mt-6 flex items-center space-x-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-1000"
              onClick={() => {
                addToCart({
                  id: products.product.id,
                  title: products.product.title,
                  thumbnail: products.product.thumbnail,
                  description: products.product.description,
                  price: 200,
                });
              }}
            >
              Add to Cart
            </button>
          </div>

          {/* Accordion Sections (Features, Care, Shipping, Returns) */}
          <div className="mt-6">
            {["Features", "Care", "Shipping", "Returns"].map((section) => (
              <div key={section} className="border-t border-gray-200 py-4">
                <button className="w-full flex justify-between items-center text-gray-700 font-semibold">
                  <span>{section}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
export default ProductDetail;
