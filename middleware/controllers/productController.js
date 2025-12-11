const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    logger.info('Fetching all products');
    
    const { page = 1, limit = 10, sort = 'name', featured } = req.query;
    
    const query = {};
    if (featured === 'true') {
      query.featured = true;
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    logger.info(`Retrieved ${products.length} products`);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// @desc    Get products by category
// @route   GET /products/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10, sort = 'name' } = req.query;
    
    logger.info(`Fetching products for category: ${category}`);

    const products = await Product.find({ category: category.toLowerCase() })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments({ category: category.toLowerCase() });

    if (products.length === 0) {
      logger.warn(`No products found for category: ${category}`);
      return res.status(404).json({
        success: false,
        message: `No products found for category: ${category}`
      });
    }

    logger.info(`Retrieved ${products.length} products for category: ${category}`);
    
    res.status(200).json({
      success: true,
      category,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    logger.error(`Error fetching products for category ${req.params.category}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products by category',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /products/product/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching product with ID: ${id}`);

    const product = await Product.findById(id);

    if (!product) {
      logger.warn(`Product not found with ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    logger.info(`Retrieved product: ${product.name}`);
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById
};