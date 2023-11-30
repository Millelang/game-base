import Player from './Player.js'
import Inputhandler from './Inputhandler.js'
import Userinterface from './Userinterface.js'
import Krokodil from './Krokodil.js'
import Camera from './Camera.js'
import First from './levels/First.js'
import Projectile from './Projectile.js'
import Background from './Background.js'
import Powerup from './Powerup.js'
import Cat from './Cat.js'
import Brick from './Bricks.js'
export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.keys = []
    this.Powerups = []
    this.enemies = []
    this.gameOver = false
    this.cats = []
    this.cat = new Cat(this)
   this.bricks = []
   this.brick = new Brick(this)
    this.input = new Inputhandler(this)
    this.Userinterface = new Userinterface(this)
    this.gravity = -10
    this.debug = false
    this.player = new Player(this)
    this.gameTime = 0
    this.background = new Background(this)
    this.enemySpawnTimer = 0
    this.enemyInterval = 5000
    this.gravity = 1
    this.catcount =0
    this.ground = this.height - 60
    this.brickheight = 100

    this.camera = new Camera(this, this.player.x, this.player.y, 0, 0)
    this.level = new First(this)
    this.cats.push(new Cat(this, 490, this.ground -this.brickheight ))
    this.cats.push(new Cat(this, 1140, this.ground-this.brickheight))
    this.cats.push(new Cat(this, 2000, this.ground))
    this.bricks.push(new Brick(this,400, this.ground -this.brickheight))
    this.bricks.push(new Brick(this,1050, this.ground -this.brickheight))

  }




  draw(context) {
    this.camera.apply(context)
    this.background.draw(context)
    
    this.player.draw(context)
    this.level.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.Powerups.forEach((Powerup) => Powerup.draw(context))
    this.cats.forEach((cat) => cat.draw(context))
    this.bricks.forEach((brick) => brick.draw(context))
    this.camera.reset(context)
    
    this.Userinterface.draw(context)
  }

  update(deltaTime) {
  
    this.cats.forEach((cat) => { cat.update(deltaTime)
    if(this.checkCollision(this.player,cat)) {
      this.cat.markedForDeletion = true
      this.catcount += 1
      console.log("hit")
    }
    
    })





    this.bricks.forEach((brick) => { brick.update(deltaTime) })
    let x = 0
    x++
    if (x == 1000) { this.player.powerup = false}  

    this.Powerups.forEach((Powerup) => Powerup.update(deltaTime))

    this.background.update

    this.gameTime += 0.1

    this.enemies.forEach((enemy) => {
      if (this.checkCollision(this.player, enemy)) {
        if (this.player.speedY > 0) {
          enemy.markedForDeletion = true
          this.player.speedY = -this.player.jumpSpeed
        } else {
          this.gameOver = true
        }
      }
    })

    this.player.grounded = false

    this.bricks.forEach((brick) => {
      let direction = this.checkCollisionDirection(this.player, brick)
      if (
        direction === 'bottom' &&
        this.player.x + this.player.width > brick.x &&
        this.player.x < brick.x + brick.width
      ) {
        this.player.grounded = true
        this.player.speedY = 0
        this.player.y = brick.y - this.player.height + 1
      }

      this.enemies.forEach((enemy) => {
        if (this.checkCollisionDirection(enemy, brick) === 'bottom') {
          enemy.speedY = 0
          enemy.y = brick.y - enemy.height
        }
        else {
          enemy.speedY += this.gravity

        }
      }
      )
     })

    this.level.platforms.forEach((platform) => {
      let direction = this.checkCollisionDirection(this.player, platform)
      if (
        direction === 'bottom' &&
        this.player.x + this.player.width > platform.x &&
        this.player.x < platform.x + platform.width
      ) {
        this.player.grounded = true
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height + 1
      }

      this.enemies.forEach((enemy) => {
        if (this.checkCollisionDirection(enemy, platform) === 'bottom') {
          enemy.speedY = 0
          enemy.y = platform.y - enemy.height
        }
        else {
          enemy.speedY += this.gravity

        }
      }
      )

    })

    this.player.update(deltaTime)
    if (!this.gameOver) {
      this.gameTime += deltaTime

      if (this.enemySpawnTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy()
        this.enemySpawnTimer = 0
      } else {
        this.enemySpawnTimer += deltaTime
      }

      this.Powerups.forEach((Powerup) => {
        if (this.checkCollision(this.player, Powerup)) {
          this.player.powerup = true
          Powerup.markedForDeletion = true
        }
      })
  
      
      
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
        if (enemy.markedForDeletion == true) {
          this.Powerups.push(new Powerup(this, enemy.x, enemy.y, enemy.spawn))
        }

        this.player.projectile.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.markedForDeletion = true
            projectile.markedForDeletion = true
          }
        })
      })
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime))
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    this.Powerups = this.Powerups.filter((Powerup) => !Powerup.markedForDeletion)
    this.cats = this.cats.filter((cat) => !cat.markedForDeletion)
    this.camera.update(this.player)
  }




  addEnemy() {
    this.enemies.push(new Krokodil(this))
  }
  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }


  checkBrickCollision(object, brick) {
    if (
      object.y + object.height >= brick.y &&
      object.y < brick.y &&
      object.x + object.width >= brick.x &&
      object.x <= brick.x + brick.width
    ) {
      if (object.grounded && object.y + object.height > brick .y) {
        object.speedY = 0
        object.y = brick.y - object.height
        object.grounded = true
      }   
      return true
    } else {
      if (object.grounded && object.y + object.height < brick.y) {
        object.grounded = false
      }
      return false
    }
  }

  checkPlatformCollision(object, platform) {
    if (
      object.y + object.height >= platform.y &&
      object.y < platform.y &&
      object.x + object.width >= platform.x &&
      object.x <= platform.x + platform.width
    ) {
      if (object.grounded && object.y + object.height > platform.y) {
        object.speedY = 0
        object.y = platform.y - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        object.grounded = false
      }
      return false
    }
  }
  checkCollisionDirection(object1, object2) {
    const vectorX =
      object1.x + object1.width / 2 - (object2.x + object2.width / 2)
    const vectorY =
      object1.y + object1.height / 2 - (object2.y + object2.height / 2)

    const halfWidths = object1.width / 2 + object2.width / 2
    const halfHeights = object1.height / 2 + object2.height / 2

    if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
      const offsetX = halfWidths - Math.abs(vectorX)
      const offsetY = halfHeights - Math.abs(vectorY)
      if (offsetX >= offsetY) {
        if (vectorY > 0) {
          return 'top'
        } else {
          return 'bottom'
        }
      } else {
        if (vectorX > 0) {
          return 'left'
        } else {
          return 'right'
        }
      }
    }
  }
}
