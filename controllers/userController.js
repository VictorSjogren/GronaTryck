// userController.js
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

// Helper function to write data to JSON file
const writeJsonFile = (filePath, data, callback) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Error writing to file ${filePath}:`, err);
      return callback(err);
    }
    callback(null);
  });
};

// Function to handle user login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);

  // Read users.json to find matching credentials
  readJsonFile(path.join(__dirname, "../data/users.json"), (err, users) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error loading users." });
    }

    const user = users.find((u) => u.email === email);

    if (user) {
      // Direct password comparison (plaintext)
      if (user.password === password) {
        console.log("Login successful for user:", user.username);
        res.json({ success: true, message: "Login successful" });
      } else {
        console.log("Invalid credentials for email:", email);
        res.json({ success: false, message: "Invalid credentials" });
      }
    } else {
      console.log("Invalid credentials for email:", email);
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
};

// Function to create a new user
exports.createUser = (req, res) => {
  const filePath = path.join(__dirname, "../data/users.json");
  const newUser = req.body;

  readJsonFile(filePath, (err, users) => {
    if (err) {
      return res.status(500).send("Error loading users.");
    }

    newUser.id = users.length + 1; // Assign a new ID
    users.push(newUser);

    writeJsonFile(filePath, users, (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error saving user.");
      }
      res.status(201).json({ success: true, user: newUser });
    });
  });
};

// Function to update a user by ID
exports.updateUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const filePath = path.join(__dirname, "../data/users.json");
  const updatedData = req.body;

  readJsonFile(filePath, (err, users) => {
    if (err) {
      return res.status(500).send("Error loading users.");
    }

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };

      writeJsonFile(filePath, users, (writeErr) => {
        if (writeErr) {
          return res.status(500).send("Error updating user.");
        }
        res.json({ success: true, user: users[userIndex] });
      });
    } else {
      res.status(404).send("User not found");
    }
  });
};

// Function to delete a user by ID
exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const filePath = path.join(__dirname, "../data/users.json");

  readJsonFile(filePath, (err, users) => {
    if (err) {
      return res.status(500).send("Error loading users.");
    }

    const newUsers = users.filter((u) => u.id !== userId);

    writeJsonFile(filePath, newUsers, (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error deleting user.");
      }
      res.json({ success: true });
    });
  });
};
