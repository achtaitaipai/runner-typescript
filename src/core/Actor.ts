import Component from './components/Component'
import Scene from './Scene'

export type ComponentConstructor<T extends Component> = new (...args: any[]) => T

export default class Actor {
	private static _lastId = 0
	public id: number
	public scene?: Scene
	public started = false
	public tags: string[] = []
	public x: number
	public y: number
	public onUpdate?: (dt: number) => void

	private _components: Component[] = []

	constructor(x: number, y: number, ...tags: string[]) {
		this.id = Actor._newId()
		this.x = x
		this.y = y
		this.tags = tags
	}

	private static _newId() {
		this._lastId++
		return this._lastId
	}

	public add(...components: Component[]) {
		components.forEach(component => {
			this._components.push(component)
			component.actor = this
		})
		return this
	}

	public get<T extends Component>(Component: ComponentConstructor<T>): T | null {
		const component = this._components.find(component => component instanceof Component)
		if (component && component instanceof Component) return component
		return null
	}

	public update(dt: number) {
		this._components.forEach(component => component.update(dt))
		if (this.onUpdate) this.onUpdate(dt)
	}

	public destroy() {
		this.scene?.remove(this)
	}

	get game() {
		return this.scene?.game
	}
}
