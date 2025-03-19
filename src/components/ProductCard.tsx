"use client";

import React from "react";
import Image from "next/image";
import { ProductCardProps } from "../types/types";
import Link from "next/link";
import { useCart } from "@/context/CartGlobalContext";

const ProductCard = ({
  id,
  thumbnail,
  title,
  price,
  description,
}: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <Link
        href={{
          pathname: "/product",
          query: {
            id,
          },
        }}
        className="group"
      >
        <div className="w-full h-84 flex items-center justify-center">
          <Image
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full"
            width={500}
            height={900}
            priority
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {/* <p className="text-gray-500 text-sm">{description}</p> */}
          <p className="text-gray-900 font-bold mt-2">{`${price.currency}${price.amount}`}</p>
        </div>
      </Link>
      {/* Add to Bag Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            addToCart({
              id,
              title,
              thumbnail,
              description,
              price: 200,
            });
          }}
          className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
