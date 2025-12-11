const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce Backend API",
      version: "1.0.0",
      description:
        "A comprehensive e-commerce backend API built with Node.js, Express.js, and MongoDB",
      contact: {
        name: "Student Developer",
        email: "student@example.com",
      },
    },
    servers: [
      {
        url: "https://ecommerce-backend-1-uszm.onrender.com",
        description: "Production server (Live)",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "http://localhost:8080",
        description: "Alternate frontend/backend port (useful for demo)",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
