const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected successfully');
    console.log('✅ Database connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Promise Rejection:', err);
  console.log('❌ Unhandled Promise Rejection. Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;