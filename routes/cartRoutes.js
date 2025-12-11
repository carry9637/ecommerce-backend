const express = require("express");
const { body } = require("express-validator");
const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controllers/cartController");
const validate = require("../middleware/validation");

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               userId:
 *                 type: string
 *           examples:
 *             sample:
 *               summary: Add product to cart example
 *               value:
 *                 productId: "<PASTE_PRODUCT_ID>"
 *                 quantity: 2
 *                 userId: "guest"
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive integer"),
  ],
  validate,
  addToCart
);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart items
 *       500:
 *         description: Server error
 */
router.get("/", getCartItems);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Server error
 */
router.delete("/:productId", removeFromCart);

module.exports = router;
