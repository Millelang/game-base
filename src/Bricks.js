import Enemy from './Enemy.js'
import Stones from './assets/sprites/Stones.png'

export default class Brick extends Enemy {
    constructor(game, x,y) {
        super(game)
        this.width = 45
        this.height = 59
        this.x = x
        this.y = y
        this.speedX = 0
        this.lives = 0
        const image = new Image()
        image.src = Stones
        this.image = image
    }

    draw (context) {
        context.drawImage(this.image, this.x-this.width, this.y -this.height)
        
    }
}