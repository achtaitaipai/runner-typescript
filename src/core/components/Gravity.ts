import Body from './Body'
import BoxCollider from './BoxCollider'
import Component from './Component'

export default class Gravity extends Component {
	public gravity: number

	constructor(gravity: number) {
		super()
		this.gravity = gravity
	}

	public update() {
		const body = this.actor?.get(Body)
		const boxCollider = this.actor?.get(BoxCollider)
		if (body) {
			body.velocity.y += this.gravity
			if (boxCollider?.onFloor) body.velocity.y = Math.min(body.velocity.y, 0)
		}
	}
}
