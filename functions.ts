export const findPivotIdx = (line: number[]) => {
	for (let i = 0; i < line.length; i++) if (line[i] !== 0) return i
	return -1
}

const findFactors = ([subject, model]: number[][]) => {
	const modelPivotIdx = findPivotIdx(model)

	const subFactor = subject[modelPivotIdx] !== undefined ? subject[modelPivotIdx] : 1
	const modFactor = model[modelPivotIdx] !== undefined ? model[modelPivotIdx] : 1

	return [subFactor, modFactor]
}

export const rationalize = (number: number, idx: number, line: number[]) => {
	const factor = line[findPivotIdx(line)] !== undefined ? line[findPivotIdx(line)] : 1

	return number / factor
}

export const transformLine = ([subject, model]: number[][]) => {
	const [subFactor, modFactor] = findFactors([subject, model])

	const result = subject.map((number, idx) => number * modFactor - model[idx] * subFactor)

	console.log('------------------------')
	console.log(model)
	console.log(subject, '=>', result)

	return result.map(rationalize)
}

export const orderByPivot = (first: number[], second: number[]) => {
	const firstPivot = findPivotIdx(first)
	const secondPivot = findPivotIdx(second)

	if (first.reduce((prev, curr) => prev + curr) === 0) return 1

	return firstPivot - secondPivot
}

export const transformMatrix = (matrix: number[][]) => {
	const temp = [...matrix]

	console.log(temp)

	for (let i = 0; i < matrix.length; i++) {
		const model = temp[i]
		for (let j = i + 1; j < matrix.length; j++) {
			const subject = temp[j]

			temp[j] = transformLine([subject, model])
		}
	}

	console.log(temp)

	for (let i = matrix.length - 1; i > -1; i--) {
		const model = temp[i]
		for (let j = i - 1; j > -1; j--) {
			const subject = temp[j]

			temp[j] = transformLine([subject, model])
		}
	}

	const finalMatrix = temp
		.map((line, idx, mat) => {
			const lastIdx = mat.length - 1

			if (idx !== lastIdx) {
				const sum = line.reduce((prev, curr) => prev + curr)

				if (sum === 0) {
					const tempLine = [...mat[lastIdx]]
					mat[lastIdx] = line
					return tempLine
				}
			}

			return line
		})
		.sort(orderByPivot)
		.map(line => line.map(number => Number(number.toPrecision(14))))

	return finalMatrix
}
