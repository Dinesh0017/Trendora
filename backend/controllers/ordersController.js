
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variables
const currency = "usd"; //currency for payment gateway
const deliveryCharge = 10; //delivery charges for each order

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing Order using COD method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save(); // save in the db order data

    await userModel.findByIdAndUpdate(userId, { cartData: {} }); // push order id in user model
    res
      .status(200)
      .json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while placing order", success: false });
  }
};

// Placing Order using Stripe method

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
        price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: "payment",
      });

    res
      .status(200)
      .json({ session_url: session.url, success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while placing order", success: false });
  }
};

//verify stripe payment
const verifyStrip = async (req, res) => {
  const { orderId, success, userId} = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ message: "Payment verified successfully", success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ message: "Payment verification failed", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", success: false });
  }
}

// Placing Order using Razorpay method

const placeOrderRazorpay = async (req, res) => {};

//All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res
      .status(200)
      .json({
        orders,
        success: true,
        message: "All orders fetched successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching all orders", success: false });
  }
};

//User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res
      .status(200)
      .json({
        orders,
        success: true,
        message: "User orders fetched successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching user orders", success: false });
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res
      .status(200)
      .json({ message: "Order status updated successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating order status", success: false });
  }
};

export {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyStrip
};
