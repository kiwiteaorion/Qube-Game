class PowerUp {
  constructor(type, duration, strength) {
    this.type = type;
    this.duration = duration;
    this.strength = strength;
    this.active = false;
    this.timeLeft = 0;
  }

  activate(square) {
    this.active = true;
    this.timeLeft = this.duration;

    switch (this.type) {
      case "speed":
        square.speed *= this.strength;
        break;
      case "shield":
        square.hasShield = true;
        break;
      case "size":
        square.size *= this.strength;
        break;
    }
  }

  deactivate(square) {
    this.active = false;

    switch (this.type) {
      case "speed":
        square.speed /= this.strength;
        break;
      case "shield":
        square.hasShield = false;
        break;
      case "size":
        square.size /= this.strength;
        break;
    }
  }

  update(delta, square) {
    if (this.active) {
      this.timeLeft -= delta;
      if (this.timeLeft <= 0) {
        this.deactivate(square);
      }
    }
  }
}
