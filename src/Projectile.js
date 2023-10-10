export default class Projectile {
    constructor(game, x, y) {
        this.game = game
        this.width = 4
        this.height = 4
        this.x = x
        this.y = y
        this.speed = 5
        this.damage = 1
        this.markedForDeletion = false

    }
    update() {
        this.x += this.speed
        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }
    }
    draw(context) {
        context.fillstyle = '#f00'
        context.fillRect(this.x, this.y, this.width, this.height)
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillstyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
    }
}