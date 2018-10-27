/*
 * Solution to the Rug Puzzle:
 * https://www.youtube.com/watch?v=HViA6N3VeHw
 * https://twitter.com/standupmaths/status/981178738594533376
 * 
 * It groups the triangles in patterns and count them.
 * Autor: Kleber Silva (kleber.swf@gmail.com)
 */

const RugPuzzle = {
	rows: 0,
	cols: 0,

	phl: function (col) { return col; },
	phr: function (col) { return this.cols - col; },
	pvd: function (row) { return row; },
	pvu: function (row) { return this.rows - row; },

	// x = 'l' or 'r'
	// y = 'u' or 'd'
	count_cross_hypotenuse: function (x, y, row, col) {
		const a = this['ph' + x](col);
		const b = this['pv' + y](row);
		return Math.ceil(Math.min(a, b) / 2);
	},

	count_double_cross_hypotenuse_1: function (x, y, row, col) {
		const a = this['ph' + x](col);
		const b = this['pv' + y](row);
		return Math.floor(Math.min(a, b) / 2);
	},

	// up and down
	count_double_cross_hypotenuse_2: function (y, row, col) {
		return Math.min(this.phl(col), this.phr(col), this['pv' + y](row));
	},

	// left and right
	count_double_cross_hypotenuse_3: function (x, row, col) {
		return Math.min(this.pvu(row), this.pvd(row), this['ph' + x](col));
	},

	cross: function (row, col) {
		let count = this.count_cross_hypotenuse('l', 'u', row, col);
		count += this.count_cross_hypotenuse('r', 'u', row, col);
		count += this.count_cross_hypotenuse('l', 'd', row, col);
		count += this.count_cross_hypotenuse('r', 'd', row, col);
		return count;
	},

	double_cross: function (row, col) {
		let count = this.count_double_cross_hypotenuse_1('l', 'u', row, col);
		count += this.count_double_cross_hypotenuse_1('r', 'u', row, col);
		count += this.count_double_cross_hypotenuse_1('l', 'd', row, col);
		count += this.count_double_cross_hypotenuse_1('r', 'd', row, col);

		count += this.count_double_cross_hypotenuse_2('u', row, col);
		count += this.count_double_cross_hypotenuse_2('d', row, col);

		count += this.count_double_cross_hypotenuse_3('l', row, col);
		count += this.count_double_cross_hypotenuse_3('r', row, col);

		return count;
	},


	count: function (rows, cols) {
		this.rows = rows;
		this.cols = cols;
		let total = 0;
		for (let r = 0; r <= rows; r++) {
			for (let c = 0; c <= cols; c++) {
				if ((r + c) % 2 === 0)
					total += this.double_cross(r, c);
				else total += this.cross(r, c);
			}
		}
		return total;
	}
}


// ============================================================================ //
// 							MAIN PROCESS EXECUTION								//
// ============================================================================ //


let input_rows = 18;
let input_cols = 20;

if (typeof process !== undefined) {
	const args = process.argv;
	if (args.length > 2) {
		const r = Number.parseInt(args[2]);
		if (r > 0) input_rows = r;
	}

	if (args.length > 3) {
		const c = Number.parseInt(args[3]);
		if (c > 0) input_cols = c;
	}
}

const result = RugPuzzle.count(input_rows, input_cols);
console.log(`Rug Puzzle solution for (${input_rows}x${input_cols}): ${result}`);
