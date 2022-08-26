import Actor from '../Actor'

export default abstract class Component {
	public actor?: Actor
	public update(_: number) {}

	get scene() {
		return this.actor?.scene
	}
	get game() {
		return this.scene?.game
	}
}
