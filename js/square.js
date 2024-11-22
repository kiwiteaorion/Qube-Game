class Square {
  constructor(x, y, controls) {
    this.x = x;
    this.y = y;
    this.color =
      GAME_CONFIG.COLORS[Math.floor(Math.random() * GAME_CONFIG.COLORS.length)];
    this.size = GAME_CONFIG.SQUARE_SIZE;
    this.speed = GAME_CONFIG.SQUARE_SPEED;
    this.health = GAME_CONFIG.MAX_HEALTH;
    this.controls = controls;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  handleInput(keys) {
    // Reset velocities
    this.velocityX = 0;
    this.velocityY = 0;

    // Apply movement based on key presses
    if (keys[this.controls.up]) this.velocityY = -this.speed;
    if (keys[this.controls.down]) this.velocityY = this.speed;
    if (keys[this.controls.left]) this.velocityX = -this.speed;
    if (keys[this.controls.right]) this.velocityX = this.speed;
  }

  update() {
    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Bounce off walls
    if (this.x <= 0 || this.x + this.size >= GAME_CONFIG.CANVAS_WIDTH) {
      this.velocityX *= -1;
    }
    if (this.y <= 0 || this.y + this.size >= GAME_CONFIG.CANVAS_HEIGHT) {
      this.velocityY *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // Draw health bar
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y - 10, this.size, 5);
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x,
      this.y - 10,
      (this.health / GAME_CONFIG.MAX_HEALTH) * this.size,
      5
    );
  }
}
