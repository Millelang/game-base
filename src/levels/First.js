
import Map from '../Map'
import Platform from '../Platform'

export default class First extends Map {
  constructor(game) {
    super(game, 30000, 500)

    
    this.addPlatform(new Platform(game, 0, 450-32, 300, 10))
  
   this.addPlatform(new Platform(game, 630, 450-32, 300, 10))
   
   this.addPlatform(new Platform(game, 1330, 450-32, 300, 10))

   this.addPlatform(new Platform(game, 2030, 450-32, 300, 10))

   this.addPlatform(new Platform(game, 1700, 300, 200, 10))
  }
}