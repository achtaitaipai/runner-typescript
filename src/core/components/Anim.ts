import Component from './Component'

export default class Anim extends Component {
	public images: ImageBitmap[]
	public fps: number
	public frames: number[]
	private _frameCursor = 0
	private _time = 0

	constructor(images: ImageBitmap[], frames: number[], fps: number) {
		super()
		this.images = images
		this.frames = frames
		this.fps = fps
	}

	public override update(dt: number) {
		super.update(dt)
		this._time += dt
		if (this._time > this._delayBetweenFrame) {
			this._time = 0
			this._frameCursor = (this._frameCursor + 1) % this.frames.length
		}
		if (this.game && this.actor) {
			const ctx = this.game.renderContext
			ctx.drawImage(this._currentFrame, this.actor.x, this.actor.y)
		}
	}

	private get _currentFrame() {
		return this.images[this.frames[this._frameCursor]]
	}

	private get _delayBetweenFrame() {
		return 1 / this.fps
	}

	get width() {
		return this._currentFrame.width
	}

	get height() {
		return this._currentFrame.height
	}
}
