const express = require("express");
const fs = require("fs");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();

// Enable live reload by injecting the livereload script
app.use(connectLivereload());

// Serve static files like CSS, JS, and images from the 'public' directory
app.use("/static", express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

// Product Detail Route with improved error handling
app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);

  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      // Handle file read errors
      return res.status(500).send("Error loading products.");
    }

    try {
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === productId);

      if (product) {
        res.render("product", { product });
      } else {
        res.status(404).send("Product not found");
      }
    } catch (jsonError) {
      // Handle JSON parsing errors
      res.status(500).send("Error parsing product data.");
    }
  });
});

// Start the express server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Create the livereload server
const liveReloadServer = livereload.createServer({
  exts: ["js", "css", "ejs"], // Watch specific file extensions
  debug: true, // Enable logging
});
liveReloadServer.watch([
  path.join(__dirname, "public"),
  path.join(__dirname, "views"),
]);

// Notify livereload server when files change
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
