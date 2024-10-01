// Handles business logic for products //
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to display the list of products
router.get("/", productController.getAllProducts);

// Route to display a single product
router.get("/product/:id", productController.getProductById);

module.exports = router;
