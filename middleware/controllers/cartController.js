const Cart = require('../models/Cart');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, userId = 'guest' } = req.body;

    logger.info(`Adding product ${productId} to cart for user ${userId}`);

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      logger.warn(`Product not found: ${productId}`);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      logger.warn(`Insufficient stock for product ${productId}. Available: ${product.stock}, Requested: ${quantity}`);
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += parseInt(quantity);
      logger.info(`Updated quantity for existing cart item: ${productId}`);
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity: parseInt(quantity)
      });
      logger.info(`Added new item to cart: ${productId}`);
    }

    await cart.save();

    // Populate product details for response
    await cart.populate('items.productId');

    logger.info(`Successfully added product to cart for user ${userId}`);
    
    res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: cart
    });

  } catch (error) {
    logger.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product to cart',
      error: error.message
    });
  }
};

// @desc    Get cart items
// @route   GET /cart
// @access  Public
const getCartItems = async (req, res) => {
  try {
    const { userId = 'guest' } = req.query;

    logger.info(`Fetching cart items for user: ${userId}`);

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      logger.info(`Empty cart for user: ${userId}`);
      return res.status(200).json({
        success: true,
        message: 'Cart is empty',
        data: {
          items: [],
          itemCount: 0,
          totalAmount: 0
        }
      });
    }

    // Calculate total amount
    let totalAmount = 0;
    const cartItems = cart.items.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      totalAmount += itemTotal;
      return {
        ...item.toObject(),
        itemTotal
      };
    });

    logger.info(`Retrieved cart with ${cart.items.length} items for user: ${userId}`);

    res.status(200).json({
      success: true,
      data: {
        items: cartItems,
        itemCount: cart.itemCount,
        totalAmount: totalAmount.toFixed(2)
      }
    });

  } catch (error) {
    logger.error('Error fetching cart items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart items',
      error: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId = 'guest' } = req.body;

    logger.info(`Removing product ${productId} from cart for user ${userId}`);

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      logger.warn(`Cart not found for user: ${userId}`);
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    logger.info(`Successfully removed product from cart: ${productId}`);

    res.status(200).json({
      success: true,
      message: 'Product removed from cart successfully',
      data: cart
    });

  } catch (error) {
    logger.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove product from cart',
      error: error.message
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart
};