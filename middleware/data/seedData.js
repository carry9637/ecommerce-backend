const Product = require('../models/Product');
const logger = require('../utils/logger');

const sampleProducts = [
  {
    name: 'iPhone 14 Pro',
    description: 'Latest Apple smartphone with advanced camera system and A16 Bionic chip',
    price: 999.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/13319261/pexels-photo-13319261.jpeg',
    stock: 50,
    rating: 4.8,
    reviews: 1247,
    featured: true
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'Premium Android smartphone with excellent camera and display',
    price: 899.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    stock: 35,
    rating: 4.6,
    reviews: 892,
    featured: true
  },
  {
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with Apple M2 chip and all-day battery life',
    price: 1199.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    stock: 25,
    rating: 4.9,
    reviews: 567,
    featured: true
  },
  {
    name: 'Nike Air Jordan 1',
    description: 'Classic basketball sneakers with iconic design',
    price: 170.00,
    category: 'clothing',
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
    stock: 100,
    rating: 4.7,
    reviews: 2341,
    featured: false
  },
  {
    name: 'Levi\'s 501 Jeans',
    description: 'Original fit denim jeans - a timeless classic',
    price: 89.99,
    category: 'clothing',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
    stock: 75,
    rating: 4.4,
    reviews: 1890,
    featured: false
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'books',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    stock: 200,
    rating: 4.3,
    reviews: 15678,
    featured: false
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'Essential guide to JavaScript programming best practices',
    price: 29.99,
    category: 'books',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    stock: 85,
    rating: 4.5,
    reviews: 342,
    featured: false
  },
  {
    name: 'IKEA BILLY Bookshelf',
    description: 'Classic wooden bookshelf perfect for any room',
    price: 49.99,
    category: 'home',
    image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg',
    stock: 30,
    rating: 4.2,
    reviews: 892,
    featured: false
  },
  {
    name: 'Wilson Tennis Racket',
    description: 'Professional grade tennis racket for serious players',
    price: 129.99,
    category: 'sports',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
    stock: 45,
    rating: 4.6,
    reviews: 234,
    featured: false
  },
  {
    name: 'L\'Oreal Paris Foundation',
    description: 'Long-lasting liquid foundation with full coverage',
    price: 24.99,
    category: 'beauty',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
    stock: 120,
    rating: 4.1,
    reviews: 1567,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    logger.info('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    logger.info(`Successfully seeded ${products.length} products`);
    
    console.log('✅ Database seeded successfully!');
    return products;
  } catch (error) {
    logger.error('Error seeding database:', error);
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase, sampleProducts };