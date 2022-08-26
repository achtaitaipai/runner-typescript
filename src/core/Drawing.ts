export default class Drawing {
	public canvas: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D

	constructor(width: number, height: number) {
		this.canvas = this._createCanvas(width, height)
		this.ctx = this.canvas.getContext('2d')!
	}

	private _createCanvas(width: number, height: number) {
		const canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		document.body.appendChild(canvas)
		return canvas
	}
}
