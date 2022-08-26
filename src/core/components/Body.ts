import BoxCollider from './BoxCollider'
import Component from './Component'

export type Direction = 'left' | 'right' | 'top' | 'bottom'

interface BodyOptions {
	maxVelocity?: number
	solid?: boolean
}

export default class Body extends Component {
	public velocity = { x: 0, y: 0 }
	public maxVelocity?: number
	public solid = true

	constructor(options?: BodyOptions) {
		super()
		if (options) {
			const { maxVelocity, solid } = options
			if (maxVelocity) this.maxVelocity = maxVelocity
			this.solid = solid ?? true
		}
	}

	public update(dt: number): void {
		this._clampVelocity(dt)
		const boxCollider = this.actor?.get(BoxCollider)
		if (this.actor) {
			this.actor.x += this.velocity.x * dt
			const xDir = this.xDirection
			if (xDir && this.solid) {
				const collider = boxCollider?.isColliding(xDir)
				if (collider && xDir === 'right') this.actor.x = collider.x - (boxCollider?.width ?? 0)
				if (collider && xDir === 'left') this.actor.x = collider.x + collider.width
			}

			this.actor.y += this.velocity.y * dt
			const yDir = this.yDirection
			if (yDir && this.solid) {
				const collider = boxCollider?.isColliding(yDir) ?? 0
				if (collider && yDir === 'top') this.actor.y = collider.y + collider.height
				if (collider && yDir === 'bottom') this.actor.y = collider.y - (boxCollider?.height ?? 0)
			}
		}
	}

	private _clampVelocity(dt: number) {
		const velocity = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2)
		if (this.maxVelocity && velocity > this.maxVelocity) {
			const factor = (this.maxVelocity / velocity) * dt
			this.velocity.x = this.velocity.x * factor
			this.velocity.y = this.velocity.y * factor
		}
	}

	get xDirection() {
		if (this.velocity.x > 0) return 'right'
		if (this.velocity.x < 0) return 'left'
		return null
	}

	get yDirection() {
		if (this.velocity.y > 0) return 'bottom'
		if (this.velocity.y < 0) return 'top'
		return null
	}
}
