import Order from "../model/orderModel.js"

// ✅ 1. Place Order
import mongoose from "mongoose";

export const placeOrder = async (req, res) => {
    try {
        console.log("🔹 Received Order Data:", JSON.stringify(req.body, null, 2)); // Debugging

        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items!" });
        }

        // ✅ Validate & Convert product IDs, Ensure quantity exists
        const formattedOrderItems = orderItems.map(item => {
            console.log("🔹 Checking item:", item); // Debugging

            if (!item.product || typeof item.product !== "string") {
                console.log("❌ Invalid Product ID:", item.product); // Debugging
                throw new Error(`Invalid product ID: ${JSON.stringify(item.product)}`);
            }

            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                throw new Error(`Invalid product ID format: ${item.product}`);
            }

            if (!item.quantity || item.quantity <= 0) {
                throw new Error(`Invalid quantity for product ID: ${item.product}`);
            }

            return {
                product: new mongoose.Types.ObjectId(item.product), // Convert to ObjectId
                quantity: item.quantity,
                price: item.price
            };
        });

        const order = new Order({
            orderItems: formattedOrderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            user: req.user._id,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("❌ Order Placement Error:", error.message); // Debugging
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate("orderItems.product", "name price images");  // 🔹 Populate product details

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ 3. Get Single Order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")  // 🔹 User ke name & email
            .populate("orderItems.product", "name price images");  // 🔹 Product details populate

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ 4. Mark Order as Delivered (Admin)
 export const markOrderAsDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        await order.save();
        res.status(200).json({ success: true, message: "Order delivered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};




// Order Status Update API (Admin Only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params; // Order ID

    // Valid statuses check karo
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value!" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully!", order });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
  }
};


// 🚀 Order Cancel API
export const cancelOrder = async (req, res) => {
    try {
        console.log("🔍 Params Received:", req.params);

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Order ID is missing in request!" });
        }

        const order = await Order.findById(id);
        if (!order) {
            console.log("❌ Order Not Found:", orderId); // ✅ Debugging
            return res.status(404).json({ message: "Order not found!" });
        }

        if (order.isCancelled) {
            return res.status(400).json({ message: "Order is already cancelled!" });
        }

        order.isCancelled = true;
        order.cancelledAt = new Date();
        await order.save();

        console.log("✅ Order Cancelled:", order._id); // ✅ Debugging
        res.json({ message: "Order cancelled successfully!", order });
    } catch (error) {
        console.error("❌ Error in cancelOrder:", error);
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
      // ✅ Check if admin
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const orders = await Order.find().populate("user", "name email phone");
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };






  