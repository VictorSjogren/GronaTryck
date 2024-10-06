document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response received:", data); // Log server response
        if (data.success) {
          alert("Login successful!");
          closeLogin(); // Close login modal after successful login
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during login. Please try again.");
      });
  });
