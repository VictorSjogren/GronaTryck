const fs = require("fs");
const path = require("path");

const getAllProducts = (req, res) => {
  fs.readFile(path.join(__dirname, "../products.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading products");
    }
    const products = JSON.parse(data);
    res.render("index", { products });
  });
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);

  fs.readFile(path.join(__dirname, "../products.json"), "utf8", (err, data) => {
    if (err) {
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
      res.status(500).send("Error parsing product data.");
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};
