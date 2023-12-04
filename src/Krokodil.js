import Enemy from './Enemy.js'
import Krokol from './assets/sprites/kroko.png'
export default class Krokodil extends Enemy {
    constructor(game) {
        super(game)
        this.width = 99
        this.height = 34
        this.x = 1500
        this.y = 390
        this.speedX = Math.random() * -1.5 - 0.5
        this.lives = 2
        const image = new Image()
        image.src = Krokol
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
}