const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan logging middleware with custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to E-commerce Backend API! 🛒',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      products: '/products',
      cart: '/api/cart',
      favorites: '/api/favorites'
    }
  });
});

// Routes
app.use('/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/cart', cartRoutes); // Alternative endpoint as mentioned in requirements
app.use('/api/favorites', favoriteRoutes);
app.use('/favorites', favoriteRoutes); // Alternative endpoint as mentioned in requirements

// 404 handler
app.use('*', (req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

