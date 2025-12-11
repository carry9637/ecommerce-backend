# E-Commerce Backend API - Project Structure & Components

## 📁 Project Directory Structure

```
ecommerce-backend/
│
├── app.js                          # Express app configuration
├── index.js                        # Server entry point
├── package.json                    # Dependencies and scripts
├── .env                            # Environment variables
├── vercel.json                     # Vercel deployment config
│
├── config/
│   └── swagger.js                  # Swagger/OpenAPI configuration
│
├── controllers/
│   ├── productController.js        # Product business logic
│   ├── cartController.js          # Cart business logic
│   └── favoriteController.js      # Favorites business logic
│
├── middleware/
│   ├── errorHandler.js            # Global error handling
│   └── validation.js              # Input validation
│
├── models/
│   ├── Product.js                 # Product database schema
│   ├── Cart.js                    # Cart database schema
│   └── Favorite.js                # Favorite database schema
│
├── routes/
│   ├── productRoutes.js           # Product API endpoints
│   ├── cartRoutes.js             # Cart API endpoints
│   └── favoriteRoutes.js         # Favorites API endpoints
│
├── utils/
│   └── logger.js                  # Winston logger configuration
│
├── scripts/
│   └── seed.js                    # Database seeding script
│
├── tests/
│   └── product.test.js            # Unit tests for products
│
├── logs/
│   └── (log files generated here)
│
└── data/
    └── seedData.js                # Sample data for seeding
```

---

## 📄 File Descriptions

### Root Files

#### `app.js` - Express Application Configuration

```javascript
✅ CORS middleware configuration
✅ Express JSON body parser
✅ Morgan HTTP request logging
✅ Swagger UI setup at /api-docs
✅ Route registration
✅ Error handler middleware
```

**Key Features:**

- Centralizes all middleware setup
- Registers all API routes
- Sets up Swagger documentation
- Configures CORS for client requests

---

#### `index.js` - Server Entry Point

```javascript
✅ MongoDB connection logic
✅ Server initialization
✅ Environment variable loading (.env)
✅ Graceful error handling
✅ Process-level error handlers
```

**Key Features:**

- Connects to MongoDB
- Starts Express server
- Handles unhandled rejections
- Logs startup status

---

#### `package.json` - Project Dependencies

```json
✅ Scripts: start, dev, test
✅ 11 production dependencies
✅ 3 development dependencies
✅ MIT License
```

**Scripts Available:**

```bash
npm start          # Production: Run server
npm run dev        # Development: Run with nodemon
npm test           # Run tests with Jest
```

---

### Controllers - Business Logic Layer

#### `controllers/productController.js`

```javascript
✅ getAllProducts()
   - Pagination support (page, limit)
   - Sorting capability
   - Featured products filtering
   - Returns: Array with metadata

✅ getProductsByCategory()
   - Category filtering
   - Pagination and sorting
   - Error handling for empty results
   - Returns: Category-specific products

✅ getProductById()
   - Single product retrieval
   - ObjectId validation
   - Detailed product information
   - 404 handling
```

**Example Response Structure:**

```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [...]
}
```

---

#### `controllers/cartController.js`

```javascript
✅ addToCart()
   - Adds product to user cart
   - Quantity management
   - Validation (stub implementation ready)

✅ getCartItems()
   - Retrieves user's cart items
   - Cart totals calculation
   - Item count

✅ removeFromCart()
   - Removes product from cart
   - Updates totals
   - Quantity adjustment
```

---

#### `controllers/favoriteController.js`

```javascript
✅ addToFavorites()
   - Adds product to favorites
   - User-specific lists

✅ getFavoriteItems()
   - Retrieves user's favorites
   - Paginated results

✅ removeFromFavorites()
   - Removes from favorites
   - Updates favorites list
```

---

### Routes - API Endpoints

#### `routes/productRoutes.js`

```javascript
// GET /products
- Fetch all products
- Query: page, limit, sort, featured

// GET /products/:category
- Fetch category products
- Query: page, limit, sort

// GET /products/product/:id
- Fetch single product
- Path: product ID
```

**Swagger Documentation:** ✅ Included for each endpoint

---

#### `routes/cartRoutes.js`

```javascript
// POST /api/cart
- Add to cart

// GET /cart
- Get cart items
- Alternative: GET /api/cart

// DELETE /api/cart/:productId
- Remove from cart
```

**Validation:** ✅ Express validator integrated

---

#### `routes/favoriteRoutes.js`

```javascript
// POST /api/favorites
- Add to favorites

// GET /api/favorites
- Get favorites

// DELETE /api/favorites/:productId
- Remove from favorites
```

---

### Models - Database Schemas

#### `models/Product.js`

```javascript
Schema Fields:
✅ name (String, required, max 100)
✅ description (String, required, max 500)
✅ price (Number, required, min 0)
✅ category (Enum: 7 categories)
✅ image (String, required - URL)
✅ stock (Number, min 0)
✅ rating (Number, 0-5)
✅ reviews (Number)
✅ featured (Boolean)

Validation:
✅ All required fields enforced
✅ Min/max length constraints
✅ Type enforcement
✅ Category enum validation
✅ Error messages for violations
```

---

#### `models/Cart.js`

```javascript
Schema Fields:
✅ userId (String, default: 'guest')
✅ items (Array of CartItems)
   ✅ productId (ObjectId reference)
   ✅ quantity (Number, min 1)
   ✅ addedAt (Date, auto)
✅ totalAmount (Number, calculated)
✅ itemCount (Number, calculated)
✅ timestamps (createdAt, updatedAt)

Features:
✅ Pre-save hook for calculations
✅ Automatic item count calculation
✅ Nested validation
```

---

#### `models/Favorite.js`

```javascript
Schema Fields:
✅ userId (String, default: 'guest')
✅ items (Array)
   ✅ productId (ObjectId reference)
   ✅ addedAt (Date, auto)
✅ timestamps (createdAt, updatedAt)

Features:
✅ User-specific lists
✅ Duplicate prevention
✅ Timestamp tracking
```

---

### Middleware - Cross-Cutting Concerns

#### `middleware/errorHandler.js`

```javascript
Global Error Handler:
✅ CastError handling (invalid ObjectId)
✅ Duplicate key error (11000)
✅ Validation error formatting
✅ Generic error handling
✅ Logging via Winston
✅ Proper HTTP status codes
✅ User-friendly messages

Handles:
- MongoDB validation errors
- Cast errors
- Duplicate entries
- Custom errors
- Uncaught exceptions
```

**Error Response Format:**

```json
{
  "success": false,
  "message": "Error message",
  "details": "Additional info"
}
```

---

#### `middleware/validation.js`

```javascript
Express Validator Integration:
✅ Input validation rules
✅ Request parameter checking
✅ Body validation
✅ Query parameter validation
✅ Error message formatting
```

---

### Utils - Utility Functions

#### `utils/logger.js`

```javascript
Winston Logger Configuration:
✅ Console transport
✅ File transport (logs directory)
✅ Timestamp formatting
✅ Color coding
✅ Multiple log levels:
   - info (blue)
   - warn (yellow)
   - error (red)

Usage:
logger.info('Message')
logger.warn('Warning')
logger.error('Error')
```

**Output:**

```
2025-12-08 23:27:37 [ecommerce-backend] info: MongoDB connected successfully
```

---

### Configuration Files

#### `config/swagger.js`

```javascript
Swagger Configuration:
✅ OpenAPI 3.0.0 spec
✅ API title: "E-commerce Backend API"
✅ Version: 1.0.0
✅ Server: http://localhost:3000
✅ API paths: ./routes/*.js, ./models/*.js
✅ Auto-generation from JSDoc comments

Serves:
- Interactive API documentation
- Schema definitions
- Request/response examples
- Try-it-out functionality
```

---

#### `.env` - Environment Variables

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
NODE_ENV=development
```

---

#### `package.json` - Dependencies Overview

**Production Dependencies (11):**

```
✅ express (4.18.2) - Web framework
✅ mongoose (8.0.3) - MongoDB ODM
✅ cors (2.8.5) - CORS middleware
✅ dotenv (16.3.1) - Environment variables
✅ bcrypt (5.1.1) - Password hashing
✅ jsonwebtoken (9.0.2) - JWT authentication
✅ express-validator (7.0.1) - Input validation
✅ morgan (1.10.0) - HTTP logging
✅ swagger-ui-express (5.0.0) - Swagger UI
✅ swagger-jsdoc (6.2.8) - Swagger generation
✅ winston (3.11.0) - Structured logging
```

**Dev Dependencies (3):**

```
✅ nodemon (3.0.2) - Auto-restart on changes
✅ jest (29.7.0) - Testing framework
✅ supertest (6.3.3) - HTTP testing
```

---

### Scripts & Data

#### `scripts/seed.js`

```javascript
Database Seeding Script:
✅ MongoDB connection
✅ Calls seedDatabase() function
✅ Error handling
✅ Process exit on completion
✅ Logging

Usage:
node scripts/seed.js
```

---

#### `data/seedData.js`

```javascript
Sample Data:
✅ Mock products with all fields
✅ Multiple categories
✅ Varied pricing and ratings
✅ Featured products
✅ Stock information

Used for:
- Testing
- Development
- Demo purposes
- Initial data loading
```

---

### Testing

#### `tests/product.test.js`

```javascript
Jest Test Suite:
✅ Product controller tests
✅ API endpoint tests
✅ Error handling tests
✅ Supertest integration

Tests:
- GET /products
- GET /products/:category
- GET /products/product/:id
- Error scenarios
```

**Run Tests:**

```bash
npm test
```

---

## 🔄 Request Flow Diagram

```
Client Request
    ↓
CORS Middleware
    ↓
Express Router
    ↓
Route Validation Middleware
    ↓
Controller Function
    ↓
Database Query (Mongoose Model)
    ↓
Response Formatting
    ↓
Morgan Logging
    ↓
Error Handler (if applicable)
    ↓
JSON Response to Client
```

---

## 🏗️ Architecture Layers

### 1. **Presentation Layer**

- Routes (`routes/`)
- Swagger UI (`/api-docs`)
- Response formatting

### 2. **Business Logic Layer**

- Controllers (`controllers/`)
- Input validation
- Business rules

### 3. **Data Access Layer**

- Models (`models/`)
- Mongoose schemas
- Database operations

### 4. **Infrastructure Layer**

- Middleware (`middleware/`)
- Logger (`utils/`)
- Configuration (`config/`)

---

## 🔐 Security Features

1. **CORS** - Cross-origin protection
2. **Input Validation** - Express validator
3. **Error Handling** - Sanitized error messages
4. **Logging** - Audit trail with Winston
5. **Mongoose Validation** - Schema-level validation
6. **Environment Variables** - Sensitive data protection

---

## 📊 Technology Stack

| Layer                | Technology         |
| -------------------- | ------------------ |
| Runtime              | Node.js            |
| Framework            | Express.js         |
| Database             | MongoDB + Mongoose |
| Logging              | Winston + Morgan   |
| Documentation        | Swagger + OpenAPI  |
| Testing              | Jest + Supertest   |
| Validation           | Express Validator  |
| Authentication Ready | JWT + Bcrypt       |

---

## ✅ Code Organization Benefits

1. **Separation of Concerns** - Clear layers
2. **Reusability** - Modular components
3. **Testability** - Isolated functions
4. **Maintainability** - Easy to locate code
5. **Scalability** - Ready to extend
6. **Professional** - Industry-standard structure

---

## 📝 Summary

This project demonstrates:

- ✅ Professional Express.js application structure
- ✅ Proper REST API design patterns
- ✅ MongoDB integration with validation
- ✅ Comprehensive error handling
- ✅ Production-ready logging
- ✅ API documentation with Swagger
- ✅ Input validation and security
- ✅ Clean code organization
- ✅ Scalable architecture

**Result:** A well-structured, maintainable, and professional backend API ready for production.
