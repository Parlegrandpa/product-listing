"use client";

import type { NextPage } from "next";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import { useState } from "react";

interface CartItemData {
  id: number;
  name: string;
  variant: string;
  image: string;
  price: number;
  quantity: number;
  stockStatus: string;
}

const initialCartItems: CartItemData[] = [
  {
    id: 1,
    name: "Nomad Tumbler",
    variant: "White",
    image: "/tumbler.png",
    price: 35.0,
    quantity: 1,
    stockStatus: "In stock",
  },
  {
    id: 2,
    name: "Basic Tee",
    variant: "Sienna Large",
    image: "/tee-sienna.png",
    price: 32.0,
    quantity: 1,
    stockStatus: "In stock",
  },
  {
    id: 3,
    name: "Basic Tee",
    variant: "Black Large",
    image: "/tee-black.png",
    price: 32.0,
    quantity: 1,
    stockStatus: "Ships in 3–4 weeks",
  },
];

const Cart: NextPage = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialCartItems);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + shipping + tax;

  // Handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Handle item removal
  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            variant={item.variant}
            image={item.image}
            price={item.price}
            quantity={item.quantity}
            stockStatus={item.stockStatus}
            onQuantityChange={(quantity) =>
              handleQuantityChange(item.id, quantity)
            }
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Order total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
        Checkout
      </button>

      {/* Continue Shopping Link */}
      <Link
        href="/"
        className="block text-center text-blue-600 text-sm mt-2 hover:underline"
      >
        or Continue Shopping →
      </Link>
    </main>
  );
};

export default Cart;
