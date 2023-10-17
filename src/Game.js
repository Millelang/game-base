import Player from './Player.js'
import Inputhandler from './Inputhandler.js'
import Userinterface from './Userinterface.js'
import Krokodil from './Krokodil.js'
import Platform from './Platform.js'

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.input = new Inputhandler(this)
    this.Userinterface = new Userinterface(this)
    this.gravity = -10
    this.debug = false
    this.player = new Player(this)
    this.enemies = []
    this.enemySpawnTimer = 0
    this.enemyInterval = 1000
    this.platforms = []
    this.platformtimer = 0
    this.platforminterval = 2500
  }

  draw(context) {
    this.player.draw(context)
    this.Userinterface.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.platforms.forEach((platform) => platform.draw(context))
  }

  update(deltaTime) {
    this.player.update(deltaTime)
    if (!this.gameOver) {
      this.gameTime += deltaTime

      if (this.enemySpawnTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy()
        this.enemySpawnTimer = 0
      } else {
        this.enemySpawnTimer += deltaTime
      }

      if (this.platformtimer > this.platforminterval && !this.gameOver) {
        this.addPlatform()
        this.platformtimer = 0
      } else {
        this.platformtimer += deltaTime
      }

      this.platforms.forEach((platform) => {
        platform.update(deltaTime)
      })

      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
        if (this.checkCollision(this.player, enemy)) {
          this.gameOver = true
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
    this.platforms.forEach((platform) => platform.update(deltaTime))
    this.platforms = this.platforms.filter((platform) => !platform.markedForDeletion)
  }

  addPlatform() {
    this.platforms.push(new Platform(this))
  }

  addEnemy() {
    this.enemies.push(new Krokodil(this))
  }
// BLI INTE GALENBLI INTE GALENBLI INTE GALENBLI INTE GALENBLI INTE GALENBLI INTE GALENBLI INTE GALEN
  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
