export default class Inputhandler {
    constructor(game) {
        this.game = game
        window.addEventListener('keydown', (event) => {


            if (
                (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight') &&
                this.game.keys.indexOf(event.key) === -1

            ) {
                console.log(event.key)
                this.game.keys.push(event.key)
            }
            if (event.key === 'd') {
                this.game.debug = !this.game.debug
            }
            if (event.key === 'e') {
                this.game.player.shoot()
            }
        })
        window.addEventListener('keyup', (event) => {
            if (this.game.keys.indexOf(event.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
            }
        })
    }
}