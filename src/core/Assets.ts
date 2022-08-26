export async function loadSprite(url: string) {
	return new Promise<HTMLImageElement>(resolve => {
		const image = new Image()
		image.onload = () => {
			resolve(image)
		}
		image.src = url
	})
}

export async function loadSpriteSheet(url: string, columns: number, rows: number) {
	const image = await loadSprite(url)
	const width = image.width / columns
	const height = image.height / rows
	const spriteSheet: ImageBitmap[] = []
	for (let y = 0; y < image.height; y += height) {
		for (let x = 0; x < image.width; x += width) {
			const sprite = await createImageBitmap(image, x, y, width, height)
			spriteSheet.push(sprite)
		}
	}
	return spriteSheet
}
