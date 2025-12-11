const express = require("express");
const { body } = require("express-validator");
const {
  addToFavorites,
  getFavoriteItems,
  removeFromFavorites,
} = require("../controllers/favoriteController");
const validate = require("../middleware/validation");

const router = express.Router();

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add product to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *           examples:
 *             sample:
 *               summary: Add product to favorites example
 *               value:
 *                 productId: "<PASTE_PRODUCT_ID>"
 *                 userId: "guest"
 *     responses:
 *       201:
 *         description: Product added to favorites
 *       400:
 *         description: Product already in favorites
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  [body("productId").notEmpty().withMessage("Product ID is required")],
  validate,
  addToFavorites
);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get favorite items
 *     tags: [Favorites]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Favorite items
 *       500:
 *         description: Server error
 */
router.get("/", getFavoriteItems);

/**
 * @swagger
 * /api/favorites/{productId}:
 *   delete:
 *     summary: Remove product from favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from favorites
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Server error
 */
router.delete("/:productId", removeFromFavorites);

module.exports = router;
