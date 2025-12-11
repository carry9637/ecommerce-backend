const logger = require("../utils/logger");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, userId = "guest" } = req.body;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (quantity && (typeof quantity !== "number" || quantity < 1)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    // Validate productId format first
    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid productId format. Remove any angle brackets and use the raw id string.",
        });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const existingIndex = cart.items.findIndex(
      (it) => String(it.productId) === String(productId)
    );
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Save cart
    await cart.save();

    logger.info(
      `Product ${productId} added to cart for user ${userId} with quantity ${quantity}`
    );

    // Populate product info for response
    await cart.populate({
      path: "items.productId",
      select: "name price image",
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    logger.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

// @desc    Get cart items
// @route   GET /cart
// @access  Public
const getCartItems = async (req, res) => {
  try {
    const userId = req.query.userId || "guest";

    logger.info(`Fetching cart items for user: ${userId}`);

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price image",
    });

    if (!cart) {
      return res
        .status(200)
        .json({
          success: true,
          data: [],
          message: "Cart items retrieved successfully",
          userId,
        });
    }

    res
      .status(200)
      .json({
        success: true,
        data: cart.items,
        message: "Cart items retrieved successfully",
        userId,
      });
  } catch (error) {
    logger.error("Error fetching cart items:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart items" });
  }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/:productId
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.query.userId || "guest";

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Find cart and remove item
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (it) => String(it.productId) !== String(productId)
    );

    if (cart.items.length === initialLength) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    await cart.save();

    logger.info(`Product ${productId} removed from cart for user ${userId}`);

    res
      .status(200)
      .json({
        success: true,
        message: "Product removed from cart successfully",
        data: { productId, userId },
      });
  } catch (error) {
    logger.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove from cart" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
};
