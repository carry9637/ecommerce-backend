const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce Backend API',
      version: '1.0.0',
      description: 'A comprehensive e-commerce backend API built with Node.js, Express.js, and MongoDB',
      contact: {
        name: 'Student Developer',
        email: 'student@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://your-api-domain.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID'
            },
            name: {
              type: 'string',
              description: 'Product name'
            },
            description: {
              type: 'string',
              description: 'Product description'
            },
            price: {
              type: 'number',
              description: 'Product price'
            },
            category: {
              type: 'string',
              enum: ['electronics', 'clothing', 'books', 'home', 'sports', 'beauty', 'toys'],
              description: 'Product category'
            },
            image: {
              type: 'string',
              description: 'Product image URL'
            },
            stock: {
              type: 'number',
              description: 'Available stock'
            },
            rating: {
              type: 'number',
              description: 'Product rating'
            },
            reviews: {
              type: 'number',
              description: 'Number of reviews'
            }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID'
            },
            quantity: {
              type: 'number',
              description: 'Quantity in cart'
            },
            addedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date added to cart'
            }
          }
        },
        Favorite: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Favorite ID'
            },
            userId: {
              type: 'string',
              description: 'User ID'
            },
            productId: {
              $ref: '#/components/schemas/Product'
            },
            addedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date added to favorites'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Products',
        description: 'Product management endpoints'
      },
      {
        name: 'Cart',
        description: 'Shopping cart management endpoints'
      },
      {
        name: 'Favorites',
        description: 'Favorites management endpoints'
      }
    ]
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs;