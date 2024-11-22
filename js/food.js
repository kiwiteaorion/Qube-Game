class Food {
  constructor() {
    this.size = GAME_CONFIG.FOOD_SIZE;
    this.respawn();
  }

  respawn() {
    this.x = Math.random() * (GAME_CONFIG.CANVAS_WIDTH - this.size);
    this.y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - this.size);
    this.color =
      GAME_CONFIG.COLORS[Math.floor(Math.random() * GAME_CONFIG.COLORS.length)];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
