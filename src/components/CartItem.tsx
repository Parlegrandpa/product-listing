import React from "react";
import Image from "next/image";

interface CartItemProps {
  name: string;
  variant: string;
  image: string;
  price: number;
  quantity: number;
  stockStatus: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  variant,
  image,
  price,
  quantity,
  stockStatus,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      {/* Item Image and Details */}
      <div className="flex items-center space-x-4">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="object-cover"
        />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{variant}</p>
          <p
            className={`text-xs ${
              stockStatus === "In stock" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {stockStatus === "In stock" && <span className="mr-1">✔</span>}
            {stockStatus}
          </p>
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="flex items-center space-x-4">
        {/* Quantity Selector */}
        <select
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="border rounded-md px-2 py-1 text-sm"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Price */}
        <p className="text-sm font-medium">${price.toFixed(2)}</p>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="text-blue-600 text-sm hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
