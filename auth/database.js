class Database {
  constructor() {
    // Using localStorage for simplicity. In a real app, use a proper backend
    this.users = JSON.parse(localStorage.getItem("users")) || {};
  }

  saveUser(username, hashedPassword) {
    this.users[username] = {
      password: hashedPassword,
      score: 0,
      gamesPlayed: 0,
    };
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  getUser(username) {
    return this.users[username];
  }

  updateUserStats(username, score) {
    if (this.users[username]) {
      this.users[username].score += score;
      this.users[username].gamesPlayed += 1;
      localStorage.setItem("users", JSON.stringify(this.users));
    }
  }
}
