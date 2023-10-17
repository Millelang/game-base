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
    this.maxSpeed = 5;
    this.time = 0
  }


  
  update(deltaTime) {

    
    
    this.time++
    if ( this.y < 360 && (this.time == 60 || this.time == 30 || this.time ==20 || this.time == 40 || this.time == 10 || this.time == 50 ) ) {
     this.time = 0
     this.speedY += 2
     
    }
    if (this.time == 60) {
      this.time = 0
    }

    if (this.y == 360) {
      this.speedY = 0
    }
    

    if (this.game.keys.includes('ArrowUp')&& this.y == 360) {
      this.speedY -= 5
    } 

    this.y += this.speedY;
    if (this.game.keys.includes('ArrowLeft')) {
      this.speedX = -this.maxSpeed;
    } else if (this.game.keys.includes('ArrowRight')) {
      this.speedX = this.maxSpeed;
    } else {
      this.speedX = 0;
    }
    this.x += this.speedX;

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