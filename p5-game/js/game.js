class Game {
	constructor() {
		this.background = new Background()
		this.player = new Player()
		this.backgroundImages
		this.playerImage
		this.obstacles = []
		this.coinImage
	}

	preload() {
		this.backgroundImages = [
			{ src: loadImage("./assets/background/plx-1.png"), x: 0, speed: 0 },
			{ src: loadImage("./assets/background/plx-2.png"), x: 0, speed: 1 },
			{ src: loadImage("./assets/background/plx-3.png"), x: 0, speed: 2 },
			{ src: loadImage("./assets/background/plx-4.png"), x: 0, speed: 3 },
			{ src: loadImage("./assets/background/plx-5.png"), x: 0, speed: 4 }
		]

		this.playerImage = loadImage("./assets/player/bb8.gif")
		this.coinImage = loadImage("./assets/coins/tile000.png")
	}

	draw() {
		clear()
		this.background.draw()
		this.player.draw()

		// Every x frames we want to push a new coin into the array 
		if (frameCount % 90 === 0) {
			this.obstacles.push(new Obstacle(this.coinImage))
		}

    // Draw the obstacles
		this.obstacles.forEach(function (obstacle) {
			obstacle.draw()
		})

    // Filter the coins which are out of the canvas or had a collision
		// We need an arrow function here, so that "this" has the right context (of the game object)
		this.obstacles = this.obstacles.filter(obstacle => {
			console.log(this)

			if (obstacle.collision(this.player) || obstacle.x < 0 - obstacle.width) {
				return false
			} else {
				return true
			}
		})
	}
}
