import bnmUrl from '../assets/bnm.png'
import picUrl from '../assets/pic.png'
import cloudUrl from '../assets/cloud.png'
import cloud1Url from '../assets/cloud1.png'
import cloud2Url from '../assets/cloud2.png'
import Actor from './core/Actor'
import { loadSprite, loadSpriteSheet } from './core/Assets'
import Anim from './core/components/Anim'
import Body from './core/components/Body'
import BoxCollider from './core/components/BoxCollider'
import Gravity from './core/components/Gravity'
import JumpController from './core/components/JumpController'
import Rect from './core/components/Rect'
import Sprite from './core/components/Sprite'
import Game from './core/Game'
import Scene from './core/Scene'
import './style.css'
import { pick, random } from './utils'
import { mouseIsDown } from './Inputs'

const playerSprite = await loadSpriteSheet(bnmUrl, 2, 2)
const ennemieSprite = await loadSprite(picUrl)
const cloudSprites = [await loadSprite(cloudUrl), await loadSprite(cloud1Url), await loadSprite(cloud2Url)]

const game = new Game(800, 600)
game.scene = mainScene()
game.start()

function mainScene() {
	let time = 0
	let delayBetweenEnnemies = 2
	const scene = new Scene()
	for (let x = 0; x <= game.width; x += 50) {
		scene.add(cloud(x))
	}
	scene.onUpdate = dt => {
		time += dt
		if (time > delayBetweenEnnemies) {
			time = 0
			scene.add(ennemie())
			delayBetweenEnnemies = random(1, 2.2)
		}
	}
	return scene.add(player(), floor())
}

function player() {
	const actor = new Actor(50, 50, 'player')
	const anim = new Anim(playerSprite, [0, 1, 2, 3], 5)
	const boxCollider = new BoxCollider(anim)
	const body = new Body()
	const gravity = new Gravity(15)
	const jumpController = new JumpController(400)
	actor.onUpdate = () => {
		if (mouseIsDown()) jumpController.jump()
	}
	return actor.add(anim, boxCollider, body, gravity, jumpController)
}

function floor() {
	const actor = new Actor(0, 500)
	const rect = new Rect(800, 300, 'black')
	const boxCollider = new BoxCollider(rect)
	const body = new Body()
	return actor.add(rect, boxCollider, body)
}

function ennemie() {
	const actor = new Actor(800, 475)
	const sprite = new Sprite(ennemieSprite)
	const boxCollider = new BoxCollider(sprite)
	const body = new Body({ solid: false })
	body.velocity.x = -230
	actor.add(sprite, body, boxCollider)
	actor.onUpdate = () => {
		if (actor.x < -sprite.width) {
			actor.destroy()
		}
		if (boxCollider.isOverlapping('player')) {
			game.scene = mainScene()
		}
	}
	return actor
}

function cloud(posX?: number) {
	const px = posX ? random(posX - 100, posX + 100) : 600
	const actor = new Actor(px, random(10, 50), 'ennemie')
	const cloudSprite = pick(cloudSprites)
	const sprite = new Sprite(cloudSprite)
	const boxCollider = new BoxCollider(sprite)
	const body = new Body({ solid: false })
	body.velocity.x = -50
	actor.add(sprite, body, boxCollider)
	actor.onUpdate = () => {
		if (actor.x < -sprite.width) {
			actor.scene?.add(cloud(game.width))
			actor.destroy()
		}
	}
	return actor
}
