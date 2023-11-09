import Enemy from './Enemy.js'
import Cat from './assets/sprites/cat.png'

export default class Cat extends Enemy {
    constructor(game, x,y) {
        this.cat = Cat
        super(game)
        this.width = 64
        this.height = 16
        this.x = x
        this.y = y
        this.speedX = 0
        this.lives = 0
    }
}