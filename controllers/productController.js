// productController.js
const fs = require("fs");
const path = require("path");

// Helper function to read and parse JSON file
const readJsonFile = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file from ${filePath}:`, err);
      return callback(err, null);
    }

    try {
      const parsedData = JSON.parse(data);
      callback(null, parsedData);
    } catch (jsonError) {
      console.error(`Error parsing JSON from ${filePath}:`, jsonError);
      callback(jsonError, null);
    }
  });
};

// Function to get all products
const getAllProducts = (req, res) => {
  const filePath = path.join(__dirname, "../data/products.json");
  console.log("Loading products from:", filePath);

  readJsonFile(filePath, (err, products) => {
    if (err) {
      return res.status(500).send("Error loading products.");
    }
    res.render("index", { products });
  });
};

// Function to get a product by its ID
const getProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const filePath = path.join(__dirname, "../data/products.json");

  readJsonFile(filePath, (err, products) => {
    if (err) {
      return res.status(500).send("Error loading products.");
    }

    const product = products.find((p) => p.id === productId);

    if (product) {
      res.render("product", { product });
    } else {
      res.status(404).send("Product not found");
    }
  });
};

// Export the functions for use in routes
module.exports = {
  getAllProducts,
  getProductById,
};
