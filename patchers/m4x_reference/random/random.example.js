// https://p5js.org/reference/#/p5/random

/**
 * @method random([min], [max])
 *
 * Return a random floating-point number.
 * Takes either 0, 1 or 2 arguments.
 * If no argument is given, returns a random number from 0 up to (but not including) 1.
 * If one argument is given and it is a number, returns a random number from 0 up to (but not including) the number.
 *
 * Parameters
 *
 * @param 	{number} [min]  the lower bound (inclusive) (Optional)
 * @param 	{number} [max]  the upper bound (exclusive) (Optional)
 *
 * @returns {number}    		the random number
 */

include('gd.mouseinfo');
var { m4x } = require('m4x');

var width = 200;
var height = 200;

var m4 = new m4x();
var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

var finished = false;

function draw() {
	if (!finished) {
		background([1, 1, 1, 1]);
		for (var i = 0; i < width; i++) {
			var rand_num = m4.random(-width / 2, width / 2);
			mg.move_to(width / 2, i);
			mg.line_to(width / 2 + rand_num, i);
			mg.stroke();
		}
		finished = true;
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function background(c) {
	mg.set_source_rgba(c);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill bg_color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
