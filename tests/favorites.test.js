const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { seedDatabase } = require("../data/seedData");
const Product = require("../models/Product");

const MONGODB_URI =
  process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/ecommerce_test";

describe("Favorites Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should add product to favorites and retrieve it", async () => {
    const product = await Product.findOne();
    expect(product).toBeDefined();

    const userId = "test-user-fav";
    const addRes = await request(app)
      .post("/api/favorites")
      .send({ productId: product._id.toString(), userId })
      .expect(201);

    expect(addRes.body.success).toBe(true);
    expect(addRes.body.data).toBeDefined();

    const getRes = await request(app)
      .get(`/favorites?userId=${userId}`)
      .expect(200);

    expect(getRes.body.success).toBe(true);
    expect(Array.isArray(getRes.body.data)).toBe(true);
    expect(getRes.body.data.length).toBeGreaterThan(0);
  });

  it("should remove product from favorites", async () => {
    const product = await Product.findOne();

    const userId = "test-user-fav-remove";
    // Ensure favorite exists first
    await request(app)
      .post("/api/favorites")
      .send({ productId: product._id.toString(), userId })
      .expect(201);

    const delRes = await request(app)
      .delete(`/api/favorites/${product._id.toString()}?userId=${userId}`)
      .expect(200);

    expect(delRes.body.success).toBe(true);
  });
});
