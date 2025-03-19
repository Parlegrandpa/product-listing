"use client";

import React from "react";
import { useCart } from "@/context/CartGlobalContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ShoppingBagDropdownProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ShoppingBagDropdown: React.FC<ShoppingBagDropdownProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  {cart.length > 0 ? (
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  alt={product.title}
                                  src={product.thumbnail}
                                  className="size-full object-cover"
                                  width={600}
                                  height={900}
                                  priority
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href="">{product.title}</a>
                                    </h3>
                                    <p className="ml-4">{`£${product.price}`}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.id}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {product.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(product.id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-lg text-gray-500">
                        Your cart is empty
                      </p>
                    </div>
                  )}
                </div>

                {cart.length > 0 ? (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{`£${totalPrice}`}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
    // <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-10">
    //   {/* Bag Items */}
    //   {cart.map((item, index) => (
    //     <div
    //       key={index}
    //       className="flex items-center space-x-4 py-2 border-b last:border-b-0"
    //     >
    //       <Image
    //         src={item.thumbnail}
    //         alt={item.title}
    //         width={60}
    //         height={60}
    //         className="object-cover"
    //       />
    //       <div>
    //         <p className="text-sm font-medium">{item.title}</p>
    //         <p className="text-xs text-gray-500">{item.quantity}</p>
    //       </div>
    //     </div>
    //   ))}

    //   {/* Checkout Button */}
    //   <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
    //     Checkout
    //   </button>

    //   {/* View Shopping Bag Link */}
    //   <Link
    //     href="/cart"
    //     className="block text-center text-blue-600 text-sm mt-2 hover:underline"
    //   >
    //     View Shopping Bag
    //   </Link>
    // </div>
  );
};

export default ShoppingBagDropdown;
