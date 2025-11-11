// auth-ui.js

document.addEventListener("DOMContentLoaded", () => {
  const authContainer = document.querySelector(".auth-buttons");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Logged-in state → show name as profile link
    authContainer.innerHTML = `
      <a href="profile.html" class="user-link" style="font-weight: 600; color: #4a00e0; text-decoration: none;">
        👤 ${currentUser.name}
      </a>
    `;
  } else {
    // Not logged in → show login/signup buttons
    authContainer.innerHTML = `
      <a href="login.html" class="login-btn">Login</a>
      <a href="signup.html" class="signup-btn">Sign Up</a>
    `;
  }
});
