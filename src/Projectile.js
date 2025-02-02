import boll from './assets/sprites/fireball.png'
export default class Projectile {
    constructor(game, x, y) {
        this.game = game
        this.width = 4
        this.height = 4
        this.x = x
        this.y = y
        this.speedY = 0
        this.speed = 5
        this.damage = 1
        this.markedForDeletion = false
        const image = new Image()
        image.src = boll
        this.image = image

    }
    update() {
        
        this.y = Math.sin(this.x * 0.1) * 10 + this.y

        this.y += this.speedY
        this.x += this.speed
       

    }
    draw(context) {
        context.drawImage(this.image, this.x,this.y)

       
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillstyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
    }
}