import Player from './Player.js'
import Inputhandler from './Inputhandler.js'
import Userinterface from './Userinterface.js'
import Krokodil from './Krokodil.js'
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
    this.enemyInterval = 10000
  }
  draw(context) {
    this.player.draw(context)
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
      
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime))
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.player.draw(context)
    this.Userinterface.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
  }
  addEnemy() {
    this.enemies.push(new Krokodil(this))
  }

}
