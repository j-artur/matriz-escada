import { transformMatrix } from './functions'

const matrix: number[][] = [
	[0, 0, 1, 2, -7],
	[2, 3, -1, 4, -5],
	[0, 10, 4, 8, 0],
	[0, 5, 2, 4, 0],
	[1, 2, 3, 7, -6],
]

// const matrix: number[][] = [
// 	[2, -1, 2, -4.6],
// 	[1, 5, -3, 17],
// 	[-4, -2, -1, -5.2],
// ]

console.log(transformMatrix(matrix))
