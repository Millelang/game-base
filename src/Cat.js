import Enemy from './Enemy.js'
import Catimg from './assets/sprites/the-cat_bigger.png'

export default class Cat extends Enemy {
    constructor(game, x,y) {
        super(game)
        this.width = 45
        this.height = 59
        this.x = x
        this.y = y
        this.speedX = 0
        this.speedY = 0.1
        this.lives = 0
        const image = new Image()
        image.src = Catimg
        this.image = image
    }

    draw (context) {
        context.drawImage(this.image, this.x, this.y)
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Arial'
            context.fillText(this.lives, this.x, this.y - 5)
            context.font = '12px Arial'
            context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
            context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
          }
        
    }
    update (context) {
        this.y += this.speedY
    }

}