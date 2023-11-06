import Projectile from "./Projectile";
import Playerimage from "./assets/sprites/haxa.png"
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

    const image = new Image()
    image.src = Playerimage
    this.image = image

    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    this.flip = false
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

    if (this.speedX < 0) {
      this.flip = true
    } else if (this.speedX > 0) {
      this.flip = false
    }
    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }



    this.projectile.forEach((projectile) => {
      projectile.update()

    })
    this.projectile = this.projectile.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  shoot() {
    this.projectile.push(new Projectile(this.game, this.x + this.width, this.y + this.height / 2))
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



      if (this.flip) {
        context.save()
        context.scale(-1, 1)
      }

      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height - 14,
        this.width,
        this.height,
        this.flip ? this.x * -1 - this.width : this.x,
        this.y,
        this.width,
        this.height
      )

    })


  }
}