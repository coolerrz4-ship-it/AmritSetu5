// script.js

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileUpload");

  // Trigger hidden file input when Upload button is clicked
  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // Handle file selection
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      // Simulate adding a record card to the grid
      const recordGrid = document.querySelector(".record-grid");

      const newCard = document.createElement("div");
      newCard.className = "record-card";
      newCard.innerHTML = `
        <h3>${file.name}</h3>
        <p>📍 Uploaded by user<br>👨‍⚕️ -</p>
        <button>View Record</button>
      `;

      recordGrid.appendChild(newCard);
      alert(`Uploaded: ${file.name}`);
    }
  });
});
// --- Signup Function ---
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      alert("User already exists!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now login.");
    window.location.href = "login.html";
  });
}

// --- Login Function ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      alert(`Welcome, ${validUser.name}!`);
      // You can store session info here too
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      window.location.href = "welcome.html"; // or dashboard
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}
// auth-check.js or inside script.js

// Pages that require login:
const protectedPages = ["ai-insights.html", "records.html"];

// Get current page
const currentPage = window.location.pathname.split("/").pop();

// Check if login is required and user is not logged in
if (protectedPages.includes(currentPage)) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
  }
}

