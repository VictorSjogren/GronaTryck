// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route for logging in a user
router.post("/login", userController.loginUser);

// Route for creating a new user
router.post("/users", userController.createUser);

// Route for updating an existing user by ID
router.put("/users/:id", userController.updateUser);

// Route for deleting a user by ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
