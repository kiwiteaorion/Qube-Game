class Auth {
  constructor() {
    this.db = new Database();
    this.currentUser = localStorage.getItem("currentUser");
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async signup(username, email, password) {
    if (!username || username.length < 3) {
      throw new Error("Username must be at least 3 characters long");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    if (this.db.getUser(username)) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await this.hashPassword(password);
    this.db.saveUser(username, hashedPassword, email);
    this.currentUser = username;
    localStorage.setItem("currentUser", username);
    return true;
  }

  async login(username, password) {
    const user = this.db.getUser(username);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await this.hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error("Invalid password");
    }

    this.currentUser = username;
    localStorage.setItem("currentUser", username);
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }
}
