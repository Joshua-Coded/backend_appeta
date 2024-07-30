import Stripe from "stripe";
import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user orders from frontend
const placeOrder = async (req, res) => {

    const frontendUrl = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,

                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {

    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findOneAndDelete(orderId)
            res.json({ success: false, message: "Not paid" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error making payment" })
    }
}

// user order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error listing orders" })
    }
}

// updating the order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Order updated successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error updating order status" })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }