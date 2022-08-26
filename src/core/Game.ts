import { startListeningInput } from '../Inputs'
import Drawing from './Drawing'
import Loop from './Loop'
import Scene from './Scene'

export default class Game {
	private _drawing: Drawing
	private _loop: Loop
	private _scene?: Scene

	constructor(width: number, height: number) {
		this._drawing = new Drawing(width, height)
		this._loop = new Loop(this.update.bind(this))
	}

	public start() {
		startListeningInput()
		this._loop.start()
	}

	public update(dt: number) {
		this.renderContext.clearRect(0, 0, this.width, this.height)
		this._scene?.update(dt)
	}

	get width() {
		return this._drawing.canvas.width
	}

	get height() {
		return this._drawing.canvas.height
	}

	get renderContext() {
		return this._drawing.ctx
	}

	set scene(newScene: Scene) {
		this._scene = newScene
		this._scene.game = this
	}
}
