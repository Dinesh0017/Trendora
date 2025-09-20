import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_free, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-100">
      {/* Title */}
      <div className="text-2xl mb-6 text-center sm:text-left">
        <Title text1={"CART "} text2={"TOTALS"} />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 text-sm sm:text-base text-gray-700">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="font-medium">Subtotal</p>
          <p className="font-semibold text-gray-900">
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Shipping */}
        <div className="flex justify-between">
          <p className="font-medium">Shipping Fee</p>
          <p className="font-semibold text-gray-900">
            {currency}
            {delivery_free}.00
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <b className="text-lg sm:text-xl">Total</b>
          <b className="text-lg sm:text-xl text-amber-500">
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_free}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
