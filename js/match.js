class Match {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.players = [];
    this.maxPlayers = 10;
    this.gameStarted = false;
    this.countdown = 5;

    // Set canvas size
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll(".ability-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.useAbility(btn.dataset.ability);
      });
    });

    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  addPlayer() {
    if (this.players.length >= this.maxPlayers) return;

    const player = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      size: 40,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      angle: Math.random() * Math.PI * 2,
      speed: 2,
      abilities: {
        speed: false,
        shield: false,
        size: false,
      },
    };

    this.players.push(player);
    document.getElementById("player-count").textContent = this.players.length;

    if (this.players.length >= 2 && !this.gameStarted) {
      this.startCountdown();
    }
  }

  startCountdown() {
    const countdownEl = document.getElementById("countdown");
    let count = this.countdown;

    const interval = setInterval(() => {
      countdownEl.textContent = count;
      count--;

      if (count < 0) {
        clearInterval(interval);
        countdownEl.textContent = "GO!";
        this.startGame();
        setTimeout(() => {
          countdownEl.textContent = "";
        }, 1000);
      }
    }, 1000);
  }

  startGame() {
    this.gameStarted = true;
    this.gameLoop();
  }

  updatePlayers() {
    this.players.forEach((player) => {
      // Update position based on angle and speed
      player.x += Math.cos(player.angle) * player.speed;
      player.y += Math.sin(player.angle) * player.speed;

      // Bounce off walls
      if (player.x < 0 || player.x > this.canvas.width)
        player.angle = Math.PI - player.angle;
      if (player.y < 0 || player.y > this.canvas.height)
        player.angle = -player.angle;

      // Randomly change direction occasionally
      if (Math.random() < 0.02) {
        player.angle += ((Math.random() - 0.5) * Math.PI) / 2;
      }
    });
  }

  drawPlayers() {
    this.players.forEach((player) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = player.color;
      this.ctx.fillRect(
        player.x - player.size / 2,
        player.y - player.size / 2,
        player.size,
        player.size
      );

      if (player.abilities.shield) {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(
          player.x - player.size / 2 - 5,
          player.y - player.size / 2 - 5,
          player.size + 10,
          player.size + 10
        );
      }
    });
  }

  useAbility(ability) {
    if (!this.gameStarted) return;

    const player = this.players[0]; // Current player
    switch (ability) {
      case "speed":
        player.speed *= 1.5;
        setTimeout(() => (player.speed /= 1.5), 3000);
        break;
      case "shield":
        player.abilities.shield = true;
        setTimeout(() => (player.abilities.shield = false), 5000);
        break;
      case "size":
        player.size *= 1.2;
        setTimeout(() => (player.size /= 1.2), 4000);
        break;
    }
  }

  gameLoop() {
    if (!this.gameStarted) return;

    // Clear canvas
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updatePlayers();
    this.drawPlayers();

    requestAnimationFrame(() => this.gameLoop());
  }
}

// Initialize match when page loads
document.addEventListener("DOMContentLoaded", () => {
  const match = new Match();
  // Simulate adding players (in real implementation, this would be handled by multiplayer logic)
  match.addPlayer();
  match.addPlayer();
});
