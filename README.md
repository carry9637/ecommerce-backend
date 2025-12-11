# E-commerce Backend API

A comprehensive e-commerce backend application built with Node.js, Express.js, and MongoDB. This project provides a robust REST API for managing products, shopping cart, and user favorites with proper logging, validation, and API documentation.

## 🚀 Features

- **Product Management**: Get all products, filter by category, search functionality
- **Shopping Cart**: Add/remove items, view cart contents with real-time calculations
- **Favorites**: Add/remove products to/from favorites list
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Logging**: Comprehensive logging with Winston
- **Validation**: Input validation with express-validator
- **Error Handling**: Centralized error handling middleware
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest test suite for API endpoints

## 📁 Project Structure

```
ecommerce-backend/
├── config/
│   └── swagger.js          # Swagger configuration
├── controllers/
│   ├── productController.js
│   ├── cartController.js
│   └── favoriteController.js
├── data/
│   └── seedData.js         # Sample data for seeding
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
├── models/
│   ├── Product.js
│   ├── Cart.js
│   └── Favorite.js
├── routes/
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── favoriteRoutes.js
├── scripts/
│   └── seed.js             # Database seeding script
├── tests/
│   └── product.test.js
├── utils/
│   └── logger.js           # Winston logger configuration
├── logs/                   # Log files directory
├── app.js                  # Express app configuration
├── index.js                # Server startup and DB connection
└── .env                    # Environment variables
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the connection string in .env

5. **Seed the database** (Optional)
   ```bash
   node scripts/seed.js
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` to view the interactive Swagger documentation.

## 🔗 API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:category` - Get products by category
- `GET /products/product/:id` - Get single product by ID

### Cart
- `POST /api/cart` - Add product to cart
- `GET /cart` - Get cart items
- `DELETE /api/cart/:productId` - Remove product from cart

### Favorites
- `POST /api/favorites` - Add product to favorites
- `GET /favorites` - Get favorite items
- `DELETE /api/favorites/:productId` - Remove product from favorites

## 📋 Request/Response Examples

### Add to Cart
```bash
POST /api/cart
Content-Type: application/json

{
  "productId": "65f123abc456def789012345",
  "quantity": 2,
  "userId": "guest"
}
```

### Response
```json
{
  "success": true,
  "message": "Product added to cart successfully",
  "data": {
    "userId": "guest",
    "items": [
      {
        "productId": "65f123abc456def789012345",
        "quantity": 2,
        "addedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "itemCount": 2,
    "totalAmount": 0
  }
}
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Logging

The application uses Winston for logging:
- **Error logs**: `logs/error.log`
- **Combined logs**: `logs/combined.log`
- **Console output**: Development mode only

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
LOG_LEVEL=info
```

### MongoDB Collections
- **products**: Product catalog
- **carts**: User shopping carts
- **favorites**: User favorite products

## 🚀 Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Configure environment variables in Vercel dashboard

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy to Netlify via GitHub integration
3. Configure environment variables

### Render Deployment
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Configure environment variables

## 📊 Database Schema

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum),
  image: String (required),
  stock: Number (default: 0),
  rating: Number (0-5),
  reviews: Number (default: 0),
  featured: Boolean (default: false)
}
```

### Cart Schema
```javascript
{
  userId: String (default: 'guest'),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number (min: 1),
    addedAt: Date
  }],
  totalAmount: Number,
  itemCount: Number
}
```

## 🔒 Security Features

- Input validation and sanitization
- Error handling middleware
- CORS configuration
- Environment variable protection
- MongoDB injection prevention

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Student Developer**
- Email: student@example.com
- GitHub: [@studentdev](https://github.com/studentdev)

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the robust database
- Swagger team for API documentation tools
- All open-source contributors

---

**Note**: This is a student project created for educational purposes. For production use, additional security measures and optimizations should be implemented.