class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
    this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

    this.isStarted = false;
    this.gameState = "waiting";
    this.keys = {};

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.square1 = new Square(
      Math.random() * (this.canvas.width - GAME_CONFIG.SQUARE_SIZE),
      Math.random() * (this.canvas.height - GAME_CONFIG.SQUARE_SIZE),
      {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
      }
    );

    this.square2 = new Square(
      Math.random() * (this.canvas.width - GAME_CONFIG.SQUARE_SIZE),
      Math.random() * (this.canvas.height - GAME_CONFIG.SQUARE_SIZE),
      {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
      }
    );

    this.food = new Food();
  }

  setupEventListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  start() {
    this.isStarted = true;
    this.gameState = "playing";
    this.gameLoop();
  }

  gameLoop(timestamp) {
    if (!this.isStarted) return;

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.square1.handleInput(this.keys);
    this.square2.handleInput(this.keys);

    this.square1.update();
    this.square2.update();

    if (Utils.checkCollision(this.square1, this.square2)) {
      const damage1 = Utils.calculateDamage(
        this.square1,
        this.square2,
        "white"
      );
      const damage2 = Utils.calculateDamage(
        this.square2,
        this.square1,
        "white"
      );

      this.square2.health -= damage1;
      this.square1.health -= damage2;
    }

    if (Utils.checkCollision(this.square1, this.food)) {
      this.food.color = this.square1.color;
    }

    if (Utils.checkCollision(this.square2, this.food)) {
      this.food.color = this.square2.color;
    }

    if (this.square1.health <= 0 || this.square2.health <= 0) {
      this.gameState = "gameOver";
    }

    this.draw();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  draw() {
    this.ctx.fillStyle = this.food.color;
    this.ctx.fillRect(
      this.food.x,
      this.food.y,
      GAME_CONFIG.SQUARE_SIZE,
      GAME_CONFIG.SQUARE_SIZE
    );

    this.square1.draw(this.ctx);
    this.square2.draw(this.ctx);

    if (this.gameState === "gameOver") {
      this.ctx.fillStyle = "black";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Game Over!",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.start();
});
