import Enemy from './Enemy.js'

export default class Krokodil extends Enemy {
    constructor(game) {
        super(game)
        this.width = 64
        this.height = 16
        this.x = 1500
        this.y = 390
        this.speedX = Math.random() * -1.5 - 0.5
        this.lives = 2
    }
}