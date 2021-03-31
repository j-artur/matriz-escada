const createMatrix = size => {
	let matrix = []

	for (let i = 0; i < size; i++) {
		let line = []
		for (let j = 0; j < size; j++) {
			line = [...line, i < j ? i - j : j - i]
		}
		matrix = [...matrix, line]
	}

	return matrix
}

console.log(createMatrix(3))
