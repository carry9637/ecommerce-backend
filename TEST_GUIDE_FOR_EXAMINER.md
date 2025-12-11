# Quick Test Guide for Course Examiner

## 🚀 How to Test the Project (Step by Step)

### Step 1: Start the Server

```bash
npm start
```

**Expected Output:**

```
🚀 Server is running on http://localhost:3000
📚 API Documentation available at http://localhost:3000/api-docs
✅ Database connected successfully
```

---

### Step 2: Open Swagger Documentation

Open your browser and go to:

```
http://localhost:3000/api-docs
```

You will see an interactive API documentation interface with all endpoints.

---

### Step 3: Test Endpoints

#### **Test 1: Welcome Endpoint**

- **Endpoint:** `GET http://localhost:3000/`
- **Expected Response:**

```json
{
  "message": "Welcome to E-commerce Backend API! 🛒",
  "version": "1.0.0",
  "documentation": "/api-docs",
  "endpoints": {
    "products": "/products",
    "cart": "/api/cart",
    "favorites": "/api/favorites"
  }
}
```

---

#### **Test 2: Get All Products**

- **Endpoint:** `GET http://localhost:3000/products`
- **Optional Query Params:**

  - `page=1` (default)
  - `limit=10` (default)
  - `sort=name` (default)
  - `featured=true` (optional)

- **Example:** `http://localhost:3000/products?page=1&limit=5`

- **Expected Response:**

```json
{
  "success": true,
  "count": 5,
  "total": 20,
  "page": 1,
  "pages": 4,
  "data": [
    {
      "_id": "...",
      "name": "Product Name",
      "description": "...",
      "price": 99.99,
      "category": "electronics",
      "image": "...",
      "stock": 10,
      "rating": 4.5,
      "reviews": 15,
      "featured": false
    }
  ]
}
```

---

#### **Test 3: Get Products by Category**

- **Endpoint:** `GET http://localhost:3000/products/electronics`
- **Supported Categories:**

  - electronics
  - clothing
  - books
  - home
  - sports
  - beauty
  - toys

- **Example:** `http://localhost:3000/products/electronics?page=1&limit=10`

- **Expected Response:**

```json
{
  "success": true,
  "category": "electronics",
  "count": 8,
  "total": 8,
  "page": 1,
  "pages": 1,
  "data": [...]
}
```

---

#### **Test 4: Get Single Product by ID**

- **Endpoint:** `GET http://localhost:3000/products/product/{id}`
- **Note:** Replace `{id}` with an actual product ID from Test 2

- **Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "Product Name",
    "description": "Detailed description",
    "price": 99.99,
    "category": "electronics",
    "image": "image_url",
    "stock": 10,
    "rating": 4.5,
    "reviews": 15,
    "featured": false
  }
}
```

---

#### **Test 5: Add to Cart**

- **Endpoint:** `POST http://localhost:3000/api/cart`
- **Request Body:**

```json
{
  "productId": "product_id_from_test_4",
  "quantity": 2
}
```

- **Expected Response:**

```json
{
  "success": true,
  "message": "Product added to cart (stub)"
}
```

---

#### **Test 6: Get Cart Items**

- **Endpoint:** `GET http://localhost:3000/cart`

- **Expected Response:**

```json
{
  "success": true,
  "data": [],
  "message": "Cart items retrieved (stub)"
}
```

---

#### **Test 7: Remove from Cart**

- **Endpoint:** `DELETE http://localhost:3000/api/cart/{productId}`

- **Expected Response:**

```json
{
  "success": true,
  "message": "Product removed from cart (stub)"
}
```

---

#### **Test 8: Add to Favorites**

- **Endpoint:** `POST http://localhost:3000/api/favorites`
- **Request Body:**

```json
{
  "productId": "product_id"
}
```

- **Expected Response:**

```json
{
  "success": true,
  "message": "Product added to favorites (stub)"
}
```

---

#### **Test 9: Get Favorites**

- **Endpoint:** `GET http://localhost:3000/api/favorites`

- **Expected Response:**

```json
{
  "success": true,
  "data": [],
  "message": "Favorite items retrieved (stub)"
}
```

---

#### **Test 10: Remove from Favorites**

- **Endpoint:** `DELETE http://localhost:3000/api/favorites/{productId}`

- **Expected Response:**

```json
{
  "success": true,
  "message": "Product removed from favorites (stub)"
}
```

---

## 🧪 Using Postman (Alternative Method)

### Import the Collection:

1. Open Postman
2. Click "New" → "Request"
3. Test each endpoint manually using the URLs and methods above

### Example Postman Test:

- **Method:** GET
- **URL:** `http://localhost:3000/products`
- **Click Send**
- Should return products list

---

## 📊 Project Highlights to Show Examiner

1. **Full REST API Implementation**

   - All CRUD-ready endpoints
   - Proper HTTP methods
   - Status codes

2. **API Documentation**

   - Swagger UI at `/api-docs`
   - Auto-generated from code
   - Interactive testing

3. **Database Integration**

   - MongoDB connected
   - Mongoose models with validation
   - Schema enforcement

4. **Professional Architecture**

   - Controllers for business logic
   - Routes for endpoints
   - Models for database
   - Middleware for cross-cutting concerns

5. **Error Handling**

   - Global error handler
   - Input validation
   - User-friendly messages

6. **Logging**
   - Winston logger with timestamps
   - HTTP request logging
   - Error logging

---

## 🔍 Common Issues & Solutions

### Issue: Server won't start

**Solution:**

1. Check MongoDB is running
2. Check port 3000 is not in use
3. Check `.env` file has correct MONGODB_URI

### Issue: Products endpoints return empty

**Solution:**

1. Run the seed script: `node scripts/seed.js`
2. This populates the database with sample data

### Issue: CORS errors

**Solution:**

1. CORS is already configured
2. Should work with any client origin
3. Check browser console for details

---

## ✅ Checklist for Examiner

Before demonstrating, verify:

- [ ] Server running on port 3000
- [ ] MongoDB connected
- [ ] Swagger UI accessible at `/api-docs`
- [ ] Root endpoint responds
- [ ] Products endpoint returns data
- [ ] Category filtering works
- [ ] Single product endpoint works
- [ ] Cart endpoints accessible
- [ ] Favorites endpoints accessible
- [ ] Error handling works (try invalid product ID)
- [ ] Logging visible in console

---

## 📞 Support Info

If examiner encounters any issues:

1. Check server logs in console
2. Verify MongoDB connection
3. Check network tab in browser
4. Restart server with `npm start`

---

**Ready to Demonstrate! ✅**
