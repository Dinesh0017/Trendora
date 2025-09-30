import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/adminIcons/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className=" min-h-screen ">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={assets.parcel_icon}
                    alt="parcel"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-indigo-600">
                  {currency}
                  {order.amount}
                </span>
              </div>

              {/* Items */}
              <div className="mb-4 space-y-1">
                {order.items.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-700 flex justify-between"
                  >
                    <span>
                      {item.name}{" "}
                      <span className="text-gray-500">({item.size})</span>
                    </span>
                    <span>x{item.quantity}</span>
                  </p>
                ))}
              </div>

              {/* Address */}
              <div className="text-sm text-gray-600 mb-4">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="mt-1 font-medium text-gray-700">
                  {order.address.phone}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t">
                <div className="text-xs text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Items:</span>{" "}
                    {order.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    <span
                      className={
                        order.payment
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {order.payment ? "Done" : "Pending"}
                    </span>
                  </p>
                </div>

                <select
                  defaultValue={order.status || "Order Placed"}
                  className="border rounded-xl px-3 py-1.5 text-sm font-medium bg-gray-50 hover:bg-gray-100 cursor-pointer focus:ring-2"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
