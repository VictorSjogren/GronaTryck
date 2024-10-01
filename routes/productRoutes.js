// Handles all product-related routes //
const fs = require("fs");
const path = require("path");

// Function to get all products
exports.getAllProducts = (req, res) => {
  fs.readFile(path.join(__dirname, "../products.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading products");
    }
    const products = JSON.parse(data);
    res.render("index", { products });
  });
};

// Function to get a single product by its ID
exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  fs.readFile(path.join(__dirname, "../products.json"), "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.render("product", { product });
    } else {
      res.status(404).send("Product not found");
    }
  });
};
