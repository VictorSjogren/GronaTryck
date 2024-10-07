const fs = require("fs");
const path = require("path");

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);

  // Helper function to handle errors
  const handleError = (message, error = null) => {
    if (error) {
      console.error(message, error);
    } else {
      console.log(message);
    }
    res.status(500).json({ success: false, message });
  };

  // Read users.json to find matching credentials
  fs.readFile(
    path.join(__dirname, "../data/users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return handleError("Error loading users.json:", err);
      }

      try {
        const users = JSON.parse(data);
        const user = users.find((u) => u.email === email);

        if (!user) {
          console.log("Invalid credentials for email:", email);
          return res.json({ success: false, message: "Invalid credentials" });
        }

        // Direct password comparison (plaintext)
        if (user.password === password) {
          console.log("Login successful for user:", user.username);
          return res.json({ success: true, message: "Login successful" });
        } else {
          console.log("Invalid credentials for email:", email);
          return res.json({ success: false, message: "Invalid credentials" });
        }
      } catch (jsonError) {
        return handleError("Error parsing user data:", jsonError);
      }
    }
  );
};
