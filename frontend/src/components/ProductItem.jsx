import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay (optional quick view/add to cart later) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-1">
          {name}
        </h3>

        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-900 text-right">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
