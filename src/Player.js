import Projectile from "./Projectile";

export default class Player {
  constructor(game) {
    this.projectile = []
    this.game = game;
    this.width = 32;
    this.height = 64;
    this.x = 50;
    this.y = 360;
    this.speedX = 1;
    this.speedY = 0;
    this.maxSpeed = 6;
    this.time = 0
    this.grounded = true
    this.jumpSpeed = 16
    this.gameGravity = -2
    this.jumpTimer = 0
    this.jumpInterval = 600
  }


  
  update(deltaTime) {

    
    

    if (this.grounded) {
      this.speedY = 0
    } else {
      this.speedY += this.game.gravity
    }

    if (this.jumpTimer <= this.jumpInterval) {
      this.jumpTimer += deltaTime
    }
    

    if (this.game.keys.includes('ArrowUp')) {
      this.jump()
    }

    if (this.game.keys.includes('ArrowLeft')) {
      this.speedX = -this.maxSpeed;
    } else if (this.game.keys.includes('ArrowRight')) {
      this.speedX = this.maxSpeed;
    } else {
      this.speedX = 0;
    }
    this.x += this.speedX;
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


  jump() {
    if (this.jumpTimer > this.jumpInterval && this.grounded) {
      this.speedY = -this.jumpSpeed
      this.jumpTimer = 0
      this.grounded = false
    }
  }


  draw(context) {
    context.fillStyle = "#f00";
    context.fillRect(this.x, this.y, this.width, this.height);
    this.projectile.forEach((projectile) => {
      projectile.draw(context)
    })


  }
}