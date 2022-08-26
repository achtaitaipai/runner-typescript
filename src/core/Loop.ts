export default class Loop {
	private _lastTime?: number
	public updateFunction: (dt: number) => void

	constructor(update: (dt: number) => void) {
		this.updateFunction = update
	}

	public start() {
		requestAnimationFrame(this._loop.bind(this))
	}

	private _loop(now: number) {
		requestAnimationFrame(this._loop.bind(this))
		if (this._lastTime) {
			const deltaTime = (now - this._lastTime) / 1000
			this.updateFunction(deltaTime)
		}
		this._lastTime = now
	}
}
