import Enemy from './Enemy.js'

export default class Krokodil extends Enemy {
    constructor(game) {
        super(game)
        this.width = 32
        this.height = 32
        this.x = 900
        this.y = 390
        this.speedX = Math.random() * -1.5 - 0.5
        this.lives = 2
    }
}