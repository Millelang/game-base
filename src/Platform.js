import Enemy from './Enemy.js'

export default class Platform extends Enemy {
    constructor(game) {
        super(game)
        this.width = 100
        this.height = 20
        this.x = 900
        this.y = 350
        this.speedX = -1
        this.lives = 999
    }
}