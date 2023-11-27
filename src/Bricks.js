import Enemy from './Enemy.js'
import Stones from './assets/sprites/stones.png'

export default class Brick extends Enemy {
    constructor(game, x,y) {
        super(game)
        this.width = 100
        this.height = 59
        this.x = x
        this.y = y
        this.speedX = 0
        this.lives = 0
        this.speedY = 0.1
        const image = new Image()
        image.src = Stones
        this.image = image
    }

    draw (context) {
        context.drawImage(this.image, this.x,this.y)
        
    }

    update (context) {
        this.y += this.speedY
    }

}