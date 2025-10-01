import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import CartTotal from "../components/CartTotal";
import LoadingSpinner from "../components/LoadingSpinner"; // ✅ Import spinner

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Spinner state

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // ✅ Checkout Handler with spinner
  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/place-order");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-10 px-4 sm:px-8 lg:px-16">
      {/* Title */}
      <div className="text-2xl mb-8">
        <Title text1={"YOUR "} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 sm:gap-6 w-full sm:w-2/3">
                <img
                  src={productData.images[0]}
                  alt={productData.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-200"
                />
                <div>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-700 font-medium">
                      {currency}
                      {productData.price}
                    </p>
                    <span className="px-3 py-1 text-xs font-medium border rounded-md bg-gray-100 text-gray-600">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity + Delete */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.bin_icon}
                  alt="remove"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total + Checkout */}
      <div className="flex flex-col gap-6 my-12 items-end">
        {/* Cart Total */}
        <div className="w-full sm:w-[450px]">
          <CartTotal />
        </div>

        {/* Checkout Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 cursor-pointer text-white text-base font-semibold tracking-wide rounded-xl shadow-md transition-all duration-300 px-8 py-3 w-full sm:w-auto ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <LoadingSpinner className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "PROCEED TO CHECKOUT"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
