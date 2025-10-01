import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      } else {
        const response = await axios.post(
          backendUrl + "/api/order/verifyStripe",
          { success, orderId },
          { headers: { token } }
        );
        if (response.data.success) {
          // Payment was successful
          navigate("/orders");
        } else {
          // Payment failed
          navigate("/cart");
        }
      }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred during payment verification.",error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
