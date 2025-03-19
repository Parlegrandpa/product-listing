"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ShoppingBagDropdown from "./ShoppingBagDropdown";
import { useCart } from "@/context/CartGlobalContext";

const Header: React.FC = () => {
  const { cart, isBagOpen, setIsBagOpen } = useCart();

  console.log(isBagOpen);
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg"
            alt="Logo"
            width={40}
            height={40}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 text-lg font-semibold"
        >
          My Shop
        </Link>
      </nav>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {/* Shopping Bag Icon with Dropdown */}
        <div className="relative">
          <button onClick={() => setIsBagOpen(!isBagOpen)}>
            <Image
              src="/assets/shopping-cart.png"
              alt="Shopping Bag"
              width={24}
              height={24}
            />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length || 0}
            </span>
          </button>
          {isBagOpen && (
            <ShoppingBagDropdown isOpen={isBagOpen} setIsOpen={setIsBagOpen} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
