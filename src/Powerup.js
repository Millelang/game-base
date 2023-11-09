import Enemy from './Enemy.js'

export default class Powerup extends Enemy {
    constructor(game,x,y,spawn) {
        super(game)
        this.spawn = spawn
        this.width = 16
        this.height = 16
        this.x = x
        this.y = y
        this.speedX = Math.random() * -1.5 - 0.5
        this.lives = 1
    }
}