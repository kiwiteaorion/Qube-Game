const Utils = {
  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.size &&
      rect1.x + rect1.size > rect2.x &&
      rect1.y < rect2.y + rect2.size &&
      rect1.y + rect1.size > rect2.y
    );
  },

  calculateDamage(attacker, defender, backgroundColor) {
    if (attacker.color === backgroundColor && !defender.hasShield) {
      return GAME_CONFIG.DAMAGE_AMOUNT;
    }
    return 0;
  },
};
