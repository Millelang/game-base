import Player from './Player.js'
import Inputhandler from './Inputhandler.js'
export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.input = new Inputhandler(this)
    this.gravity = 1
    this.debug = false
    this.player = new Player(this)

  }
  draw(context) {
    this.player.draw(context)
  }

  update(deltaTime) {
    this.player.update(deltaTime)
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
  }

  draw(context) {
    this.player.draw(context)
  }
}
