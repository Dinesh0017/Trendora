import React, { useContext,useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title";
import { useEffect } from "react";
import axios, { all } from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + "/api/order/userorders", {},{headers:{token}});
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;

            allOrdersItem.push(item);
          })
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData();
  },[token])

  return (
    <div className="border-t pt-16 px-4 sm:px-6 lg:px-8 mb-8">
      {/* Section Title */}
      <div className="text-2xl  mb-4 text-gray-800">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orderData.map((item, index) => (
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
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status + Action */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-sm sm:text-base font-medium text-green-600">
                  {item.status}
                </p>
              </div>

              {/* Track Button */}
              <button onClick={loadOrderData} className="border border-amber-500 bg-amber-500 text-white px-5 py-2 rounded-lg text-sm sm:text-base font-medium shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
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
