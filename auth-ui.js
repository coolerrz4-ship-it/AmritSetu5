// auth-ui.js

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const authContainer = document.querySelector(".auth-buttons");
  if (!authContainer) return;

  authContainer.innerHTML = ""; // Clear current buttons

  if (user) {
    // Create profile dropdown
    const profileWrapper = document.createElement("div");
    profileWrapper.className = "profile-dropdown";

    profileWrapper.innerHTML = `
      <span class="profile-name">👤${user.name}💉</span><div class="dropdown-menu">
        <button id="logoutBtn">Logout</button>
      </div>
        `;

    authContainer.appendChild(profileWrapper);

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.reload(); // refresh to reflect logout
    });
  } else {
    // Show Login and Signup buttons
    const loginBtn = document.createElement("button");
    loginBtn.className = "login-btn";
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });

    const signupBtn = document.createElement("button");
    signupBtn.className = "signup-btn";
    signupBtn.textContent = "Sign Up";
    signupBtn.addEventListener("click", () => {
      window.location.href = "signup.html";
    });

    authContainer.appendChild(loginBtn);
    authContainer.appendChild(signupBtn);
  }
});
