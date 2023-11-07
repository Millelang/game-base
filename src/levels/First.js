
import Map from '../Map'
import Platform from '../Platform'

export default class First extends Map {
  constructor(game) {
    super(game, 30000, 500)

    
    this.addPlatform(new Platform(game, 0, 450-32, 4000, 500))
  
    this.addPlatform(new Platform(game, 0, 380, 200, 50))
    this.addPlatform(new Platform(game, 540, 280, 200, 20))
    this.addPlatform(new Platform(game, 200, 280, 200, 20))
    this.addPlatform(new Platform(game, 300, 160, 200, 20))
    this.addPlatform(new Platform(game, 50, 50, 200, 20))
    this.addPlatform(new Platform(game, 1000, 320, 200, 20))

  }
}