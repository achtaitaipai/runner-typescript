import Actor, { ComponentConstructor } from './Actor'
import Component from './components/Component'
import Game from './Game'

export default class Scene {
	private _actors: Actor[] = []
	public game?: Game
	public started = false
	public onUpdate?: (dt: number) => void

	public update(dt: number) {
		this._actors.forEach(actor => actor.update(dt))
		if (this.onUpdate) this.onUpdate(dt)
	}

	public add(...actors: Actor[]) {
		actors.forEach(actor => {
			this._actors.push(actor)
			actor.scene = this
		})
		return this
	}

	public getAllByComponent<T extends Component>(Component: ComponentConstructor<T>) {
		return this._actors.filter(actor => actor.get(Component) !== null)
	}

	public getAllByTag(tag: string) {
		return this._actors.filter(actor => actor.tags.includes(tag))
	}

	public remove(...actors: Actor[]) {
		const idsToRemove = actors.map(actor => actor.id)
		this._actors = this._actors.filter(actor => !idsToRemove.includes(actor.id))
		return this
	}
}
