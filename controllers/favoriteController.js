const logger = require("../utils/logger");
const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

// @desc    Add product to favorites
// @route   POST /api/favorites
// @access  Public
const addToFavorites = async (req, res) => {
  try {
    const { productId, userId = "guest" } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
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

    try {
      const created = await Favorite.create({ userId, productId });
      await created.populate({ path: "productId", select: "name price image" });

      logger.info(`Product ${productId} added to favorites for user ${userId}`);

      res
        .status(201)
        .json({
          success: true,
          message: "Product added to favorites successfully",
          data: created,
        });
    } catch (err) {
      // Handle duplicate favorite (unique index)
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ success: false, message: "Product already in favorites" });
      }
      throw err;
    }
  } catch (error) {
    logger.error("Error adding to favorites:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add to favorites" });
  }
};

// @desc    Get favorite items
// @route   GET /favorites
// @access  Public
const getFavoriteItems = async (req, res) => {
  try {
    const userId = req.query.userId || "guest";
    logger.info(`Fetching favorite items for user: ${userId}`);

    const favorites = await Favorite.find({ userId }).populate({
      path: "productId",
      select: "name price image",
    });

    res
      .status(200)
      .json({
        success: true,
        data: favorites,
        message: "Favorite items retrieved successfully",
        userId,
      });
  } catch (error) {
    logger.error("Error fetching favorite items:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favorite items" });
  }
};

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/:productId
// @access  Public
const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.query.userId || "guest";

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const removed = await Favorite.findOneAndDelete({ userId, productId });
    if (!removed) {
      return res
        .status(404)
        .json({ success: false, message: "Favorite not found" });
    }

    logger.info(
      `Product ${productId} removed from favorites for user ${userId}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Product removed from favorites successfully",
        data: { productId, userId },
      });
  } catch (error) {
    logger.error("Error removing from favorites:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove from favorites" });
  }
};

module.exports = {
  addToFavorites,
  getFavoriteItems,
  removeFromFavorites,
};
