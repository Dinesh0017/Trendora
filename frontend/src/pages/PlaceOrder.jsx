import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/images/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //api calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data.success);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-10 pt-6 lg:pt-14 min-h-[80vh] border-t border-gray-300 px-4 sm:px-8"
    >
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full lg:max-w-[500px] bg-white p-6 rounded-xl shadow-md">
        <div className="text-xl sm:text-2xl mb-2 mt-2">
          <Title text1={"DELIVERY "} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="w-1/2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="w-1/2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            className="w-1/2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="w-1/2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>
        <input
          type="number"
          placeholder="Phone Number"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>

      {/* Right Side - Cart & Payment */}
      <div className="flex-1 flex flex-col gap-10">
        {/* Cart Summary */}
        <div className="bg-white ">
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-xl shadow-md text-2xl">
          <Title text1={"PAYMENT "} text2={"METHOD"} />

          <div className="flex flex-col gap-3 mt-4">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                method === "stripe"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`w-4 h-4 border rounded-full ${
                  method === "stripe"
                    ? "bg-amber-500 border-amber-500"
                    : "border-gray-400"
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                method === "razorpay"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`w-4 h-4 border rounded-full ${
                  method === "razorpay"
                    ? "bg-amber-500 border-amber-500"
                    : "border-gray-400"
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                method === "cod"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`w-4 h-4 border rounded-full ${
                  method === "cod"
                    ? "bg-amber-500 border-amber-500"
                    : "border-gray-400"
                }`}
              ></p>
              <p className="text-gray-600 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="w-full text-right mt-8">
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-3 text-sm font-semibold rounded-lg shadow-md transition-all"
              type="submit"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
