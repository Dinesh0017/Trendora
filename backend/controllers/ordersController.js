import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';


// Placing Order using COD method

const placeOrder = async(req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData ={
            userId, items, amount, address, paymentMethod: "COD", payment: false, date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save(); // save in the db order data

        await userModel.findByIdAndUpdate(userId, {cartData:{}}) // push order id in user model
        res.status(200).json({message: "Order placed successfully",success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while placing order", success: false});
    }
}



// Placing Order using Stripe method

const placeOrderStripe = async(req, res) => {}



// Placing Order using Razorpay method

const placeOrderRazorpay = async(req, res) => {}



//All orders data for admin panel
const allOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ orders, success: true, message: "All orders fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching all orders", success: false });
    }
}



//User order data for frontend
const userOrders = async(req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.status(200).json({ orders, success: true, message: "User orders fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching user orders", success: false });
    }
}


//update order status from admin panel
const updateStatus = async(req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.status(200).json({message: "Order status updated successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error updating order status", success: false});
    }
}


export { placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, placeOrderRazorpay };