function initializeTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle i");
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  const auth = new Auth();
  const game = new Game();

  // DOM Elements
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const authContainer = document.getElementById("auth-container");
  const gameContainer = document.getElementById("game-container");

  // Form switching handlers
  document.getElementById("show-signup").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // Login handler
  document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
      showError("login-form", "Please fill in all fields");
      return;
    }

    try {
      await auth.login(username, password);
      authContainer.style.display = "none";
      gameContainer.style.display = "block";
      document.getElementById(
        "username-display"
      ).textContent = `Welcome, ${username}!`;
      game.start();
    } catch (error) {
      showError("login-form", error.message);
    }
  });

  // Signup handler
  document.getElementById("signup-btn").addEventListener("click", async () => {
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password"
    ).value;

    if (!username || !email || !password || !confirmPassword) {
      showError("signup-form", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      showError("signup-form", "Passwords do not match");
      return;
    }

    try {
      await auth.signup(username, email, password);
      authContainer.style.display = "none";
      gameContainer.style.display = "block";
      document.getElementById(
        "username-display"
      ).textContent = `Welcome, ${username}!`;
      game.start();
    } catch (error) {
      showError("signup-form", error.message);
    }
  });

  // Logout handler
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    auth.logout();
    authContainer.style.display = "block";
    gameContainer.style.display = "none";
    clearForms();
  });
});

// Helper functions
function showError(formId, message) {
  const form = document.querySelector(`#${formId} .auth-form`);
  let errorDiv = form.querySelector(".error-message");

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    form.appendChild(errorDiv);
  }

  errorDiv.textContent = message;
  errorDiv.style.opacity = "1";
}

function clearForms() {
  // Clear all input fields
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));

  // Clear error messages
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());
}
