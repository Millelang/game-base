import Projectile from "./Projectile";

export default class Player {
  constructor(game) {
    this.projectile = []
    this.game = game;
    this.width = 32;
    this.height = 64;
    this.x = 50;
    this.y = 100;
    this.speedX = 1;
    this.speedY = 0;
    this.maxSpeed = 10;
  }

  update(deltaTime) {


    if (this.game.keys.includes('ArrowUp')) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes('ArrowDown')) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;

    this.projectile.forEach((projectile) => {
      projectile.update()

    })
    this.projectile = this.projectile.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  shoot() {
    this.projectile.push(new Projectile(this.game,this.x + this.width, this.y + this.height / 2))
  }


  draw(context) {
    context.fillStyle = "#f00";
    context.fillRect(this.x, this.y, this.width, this.height);
    this.projectile.forEach((projectile) => {
      projectile.draw(context)
    })


  }
}