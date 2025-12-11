const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { seedDatabase } = require('../data/seedData');

// Test database
const MONGODB_URI = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/ecommerce_test';

describe('Product Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedDatabase(); // Seed test database before tests
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clean up test database
    await mongoose.connection.close();
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const res = await request(app)
        .get('/products')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should return featured products when filtered', async () => {
      const res = await request(app)
        .get('/products?featured=true')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /products/:category', () => {
    it('should return products by category', async () => {
      const res = await request(app)
        .get('/products/electronics')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.category).toBe('electronics');
    });

    it('should return 404 for non-existent category', async () => {
      const res = await request(app)
        .get('/products/nonexistent')
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });
});
