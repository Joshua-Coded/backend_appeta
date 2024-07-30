import userModel from "../models/userModels.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId })
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData })
        res.json({ satisfies: true, message: "Added item TO cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error updating item to cart" })
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
        res.json({ success: true, message: "Removed from cart successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart!" });
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error loading cart" })
    }
}
export { getCart, removeFromCart, addToCart }
