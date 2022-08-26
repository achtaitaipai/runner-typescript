import Component from './Component'

export default class Sprite extends Component {
	public image: HTMLImageElement

	constructor(img: HTMLImageElement) {
		super()
		this.image = img
	}

	public override update(dt: number) {
		super.update(dt)
		if (this.game && this.actor) {
			const ctx = this.game.renderContext
			ctx.drawImage(this.image, this.actor.x, this.actor.y)
		}
	}

	get width() {
		return this.image.width
	}

	get height() {
		return this.image.height
	}
}
