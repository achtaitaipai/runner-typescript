let down = false

export function startListeningInput() {
	document.addEventListener('mousedown', () => (down = true))
	document.addEventListener('mouseup', () => (down = false))
}

export function mouseIsDown() {
	return down
}
