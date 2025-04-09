import Cart from "../model/cartModel.js"


// ✅ 1. Add to Cart
 export const addToCart = async (req, res) => {
     
     try {
        const { productId, quantity } = req.body;
        
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, cartItems: [] });
        }

        const existingItemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);

        if (existingItemIndex > -1) {
            cart.cartItems[existingItemIndex].quantity += quantity;
        } else {
            cart.cartItems.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ 2. Get User Cart
 export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product", "name price images");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found!" });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ 3. Remove from Cart
 export const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found!" });
        }

        cart.cartItems = cart.cartItems.filter((item) => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};
