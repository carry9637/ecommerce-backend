const Product = require("../models/Product");
const logger = require("../utils/logger");

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description:
      "Comfortable over-ear wireless headphones with noise cancellation.",
    price: 79.99,
    category: "electronics",
    image: "https://example.com/images/headphones.jpg",
    stock: 25,
    rating: 4.3,
    reviews: 120,
    featured: true,
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Soft organic cotton t-shirt available in multiple colors.",
    price: 19.99,
    category: "clothing",
    image: "https://example.com/images/tshirt.jpg",
    stock: 100,
    rating: 4.6,
    reviews: 78,
    featured: false,
  },
  {
    name: "Coffee Table Book: Architecture",
    description: "Beautifully illustrated book on modern architecture.",
    price: 29.5,
    category: "books",
    image: "https://example.com/images/book.jpg",
    stock: 40,
    rating: 4.9,
    reviews: 45,
    featured: false,
  },
  {
    name: "Ceramic Vase",
    description: "Handmade ceramic vase for home decoration.",
    price: 34.0,
    category: "home",
    image: "https://example.com/images/vase.jpg",
    stock: 15,
    rating: 4.2,
    reviews: 10,
    featured: true,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat for daily practice.",
    price: 24.99,
    category: "sports",
    image: "https://example.com/images/yogamat.jpg",
    stock: 60,
    rating: 4.5,
    reviews: 210,
    featured: false,
  },
  {
    name: "Building Blocks Set",
    description: "Colorful building blocks for ages 3 and up.",
    price: 14.99,
    category: "toys",
    image: "https://example.com/images/blocks.jpg",
    stock: 80,
    rating: 4.4,
    reviews: 55,
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    // Remove existing products to avoid duplicates during repeated seeds
    await Product.deleteMany({});

    // Insert sample products
    const created = await Product.insertMany(sampleProducts);
    logger.info(`Seeded ${created.length} products into the database`);
    console.log(`Seeded ${created.length} products into the database`);
    return created;
  } catch (error) {
    logger.error("Error seeding database:", error);
    throw error;
  }
};

module.exports = { seedDatabase, sampleProducts };
