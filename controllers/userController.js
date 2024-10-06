const fs = require("fs");
const path = require("path");

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);

  // Read users.json to find matching credentials
  fs.readFile(path.join(__dirname, "../users.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error loading users.json:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error loading users." });
    }

    try {
      const users = JSON.parse(data);
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
    } catch (jsonError) {
      console.error("Error parsing user data:", jsonError);
      res
        .status(500)
        .json({ success: false, message: "Error parsing user data." });
    }
  });
};
