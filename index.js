const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Serve static files like CSS, JS, and images from the 'public' directory
app.use("/static", express.static(path.join(__dirname, "public")));

// Home Route - Display list of products
app.get("/", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading products");
    }
    const products = JSON.parse(data);
    res.render("index", { products });
  });
});

// Product Detail Route
app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  fs.readFile("products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.render("product", { product });
    } else {
      res.status(404).send("Product not found");
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
