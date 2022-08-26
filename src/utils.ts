export function lerp(value1: number, value2: number, amount: number) {
	amount = amount < 0 ? 0 : amount
	amount = amount > 1 ? 1 : amount
	return value1 + (value2 - value1) * amount
}

export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max + 1)) + min
}

export function pick<T>(array: T[]) {
	const index = random(0, array.length - 1)
	return array[index]
}

export function chunckArray<T>(array: T[], size: number) {
	function* chunk<T>(array: T[], size: number) {
		var clone = [...array]
		while (clone.length > 0) yield clone.splice(0, size)
	}
	return [...chunk(array, size)]
}
