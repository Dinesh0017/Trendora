import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-6 lg:px-8 mb-8">
      {/* Section Title */}
      <div className="text-2xl  mb-4 text-gray-800">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Product Info */}
            <div className="flex items-start gap-5">
              {/* Product Image */}
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-16 sm:w-24 sm:h-24 object-cover rounded-lg "
              />

              {/* Product Details */}
              <div>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.name}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-700 text-sm sm:text-base">
                  <p className="font-medium text-amber-600">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-gray-600">Quantity: 1</p>
                  <p className="text-gray-600">Size: M</p>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  Date: <span className="text-gray-400">25, Sep, 2025</span>
                </p>
              </div>
            </div>

            {/* Order Status + Action */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-sm sm:text-base font-medium text-green-600">
                  Ready to ship
                </p>
              </div>

              {/* Track Button */}
              <button className="border border-amber-500 bg-amber-500 text-white px-5 py-2 rounded-lg text-sm sm:text-base font-medium shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
