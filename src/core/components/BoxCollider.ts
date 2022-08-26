import Actor from '../Actor'
import Body, { Direction } from './Body'
import Component from './Component'

interface Size {
	width: number
	height: number
}

interface Rect {
	x: number
	y: number
	width: number
	height: number
}

export default class BoxCollider extends Component {
	public width: number
	public height: number

	constructor(size: Size) {
		super()
		this.width = size.width
		this.height = size.height
	}

	public isColliding(direction: Direction) {
		if (!this.actor?.get(Body)?.solid) return null
		const actors = this.scene?.getAllByComponent(Body)
		if (actors) {
			for (const actor of actors) {
				const rect1 = this._zoneCollision(direction)
				const rect2 = actor.get(BoxCollider)!
				const isSolid = actor.get(Body)?.solid
				if (isSolid && actor.id !== this.actor?.id && this._rectCollision(rect1, rect2)) {
					return rect2
				}
			}
		}
		return null
	}

	public isOverlapping(tag: string) {
		const actors = this.scene?.getAllByTag(tag)
		const results: Actor[] = []
		actors?.forEach(actor => {
			if (actor.id !== this.actor?.id) {
				const box = actor.get(BoxCollider)?.box
				if (box && this._rectCollision(this.box, box)) results.push(actor)
			}
		})
		if (results.length === 0) return false
		return results
	}

	private _rectCollision(rect1: Rect, rect2: Rect) {
		return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y
	}

	private _zoneCollision(direction: Direction) {
		switch (direction) {
			case 'left':
				return {
					x: this.box.x - 1,
					y: this.box.y + 1,
					width: 1,
					height: this.box.height - 2,
				}
			case 'right':
				return {
					x: this.box.x + this.box.width,
					y: this.box.y + 1,
					width: 1,
					height: this.box.height - 2,
				}
			case 'top':
				return {
					x: this.box.x,
					y: this.box.y,
					width: this.box.width - 2,
					height: 1,
				}
			case 'bottom':
				return {
					x: this.box.x + 1,
					y: this.box.y + this.box.height,
					width: this.box.width - 2,
					height: 1,
				}
		}
	}

	get box() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		}
	}

	public get x() {
		return this.actor?.x ?? 0
	}

	public get y() {
		return this.actor?.y ?? 0
	}

	get onFloor(): boolean {
		return this.isColliding('bottom') !== null
	}
	get onCeil(): boolean {
		return this.isColliding('top') !== null
	}
	get onWall(): boolean {
		return this.isColliding('left') !== null || this.isColliding('right') !== null
	}
}
