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

    }
    update() {
        
        this.y = Math.sin(this.x * 0.1) * 10 + this.y

        this.y += this.speedY
        this.x += this.speed
        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }

    }
    draw(context) {
        context.fillstyle = '#f00#FC8A17'
        context.fillRect(this.x, this.y, this.width, this.height)
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillstyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
    }
}