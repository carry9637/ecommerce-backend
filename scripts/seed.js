const mongoose = require('mongoose');
require('dotenv').config();
const { seedDatabase } = require('../data/seedData');
const logger = require('../utils/logger');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db';

const runSeed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('📦 Connected to MongoDB for seeding...');
    logger.info('Connected to MongoDB for seeding');

    // Run seeding
    await seedDatabase();
    
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = runSeed;