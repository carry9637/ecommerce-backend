const Favorite = require('../models/Favorite');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Add product to favorites
// @route   POST /api/favorites
// @access  Public
const addToFavorites = async (req, res) => {
  try {
    const { productId, userId = 'guest' } = req.body;

    logger.info(`Adding product ${productId} to favorites for user ${userId}`);

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      logger.warn(`Product not found: ${productId}`);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
      logger.info(`Product ${productId} already in favorites for user ${userId}`);
      return res.status(400).json({
        success: false,
        message: 'Product already in favorites'
      });
    }

    // Create new favorite
    const favorite = new Favorite({
      userId,
      productId
    });

    await favorite.save();

    // Populate product details
    await favorite.populate('productId');

    logger.info(`Successfully added product to favorites: ${productId}`);

    res.status(201).json({
      success: true,
      message: 'Product added to favorites successfully',
      data: favorite
    });

  } catch (error) {
    logger.error('Error adding to favorites:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product to favorites',
      error: error.message
    });
  }
};

// @desc    Get favorite items
// @route   GET /favorites
// @access  Public
const getFavoriteItems = async (req, res) => {
  try {
    const { userId = 'guest' } = req.query;

    logger.info(`Fetching favorite items for user: ${userId}`);

    const favorites = await Favorite.find({ userId }).populate('productId');

    if (favorites.length === 0) {
      logger.info(`No favorites found for user: ${userId}`);
      return res.status(200).json({
        success: true,
        message: 'No favorites found',
        data: []
      });
    }

    logger.info(`Retrieved ${favorites.length} favorite items for user: ${userId}`);

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });

  } catch (error) {
    logger.error('Error fetching favorite items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorite items',
      error: error.message
    });
  }
};

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/:productId
// @access  Public
const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId = 'guest' } = req.body;

    logger.info(`Removing product ${productId} from favorites for user ${userId}`);

    const favorite = await Favorite.findOneAndDelete({ userId, productId });

    if (!favorite) {
      logger.warn(`Favorite not found for user ${userId} and product ${productId}`);
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    logger.info(`Successfully removed product from favorites: ${productId}`);

    res.status(200).json({
      success: true,
      message: 'Product removed from favorites successfully'
    });

  } catch (error) {
    logger.error('Error removing from favorites:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove product from favorites',
      error: error.message
    });
  }
};

module.exports = {
  addToFavorites,
  getFavoriteItems,
  removeFromFavorites
};