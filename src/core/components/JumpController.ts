import Body from './Body'
import BoxCollider from './BoxCollider'
import Component from './Component'

export default class JumpController extends Component {
	private _lastJumpRequest: number = 0
	private _lastTimeOnFloor: number = 0
	public jumpTimeTolerence = -Infinity
	public velocity

	constructor(velocity: number, jumpTimeTolerence?: number) {
		super()
		this.velocity = velocity
		this.jumpTimeTolerence = jumpTimeTolerence ?? this.jumpTimeTolerence
	}

	public update() {
		const boxCollider = this.actor?.get(BoxCollider)
		const now = window.performance.now()
		if (boxCollider?.onFloor) {
			this._lastTimeOnFloor = now
			if (now - this._lastJumpRequest < this.jumpTimeTolerence) this._jump()
		}
	}

	public jump() {
		const boxCollider = this.actor?.get(BoxCollider)
		const body = this.actor?.get(Body)
		const now = window.performance.now()
		if (boxCollider?.onFloor) this._jump()
		else if (now - this._lastTimeOnFloor < this.jumpTimeTolerence && body?.yDirection === 'bottom') this._jump()
		else this._lastJumpRequest = window.performance.now()
	}

	private _jump() {
		const body = this.actor?.get(Body)
		if (body) body.velocity.y = -this.velocity
	}
}
