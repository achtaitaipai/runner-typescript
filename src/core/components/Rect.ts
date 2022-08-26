import Component from './Component'

export default class Rect extends Component {
	public width: number
	public height: number
	public color: string

	constructor(width: number, height: number, color: string) {
		super()
		this.width = width
		this.height = height
		this.color = color
	}

	public override update(dt: number) {
		super.update(dt)
		if (this.game && this.actor) {
			const ctx = this.game.renderContext
			ctx.fillStyle = this.color
			ctx.fillRect(this.actor.x, this.actor.y, this.width, this.height)
		}
	}
}
