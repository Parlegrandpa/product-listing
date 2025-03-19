"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartContextProps, Product, ProductCartProps } from "../types/types";

export const CartContext = createContext<CartContextProps>({
  cart: [],
  totalPrice: 0,
  addToCart: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  isBagOpen: false,
  setIsBagOpen: () => {},
});

import { ReactNode } from "react";

export const CartGlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductCartProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  }, [cart]);

  // Add product to cart or update quantity
  const addToCart = ({ id, thumbnail, title, description, price }: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          { id, title, description, price, thumbnail, quantity: 1 },
        ];
      }
    });
    setIsBagOpen(true);
  };

  // Remove one unit of a product or delete it if quantity is 1
  const decreaseQuantity = (productId: string) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity reaches 0
    );
  };

  // Remove a product completely from the cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        isBagOpen,
        setIsBagOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartGlobalProvider");
  return context;
};
