// hhttps://p5js.org/reference/#/p5/randomSeed

/**
 * @method random_seed(seed)
 *
 * Sets the seed value for m4x.random().
 *
 * By default, random() produces different results each time the program is run.
 * Set the seed parameter to a constant to return the same pseudo-random numbers
 * each time the software is run.
 *
 * Parameters
 *
 * @param 	{number} seed  the seed value
 */

include('gd.mouseinfo');
var { m4x } = require('m4x');

var width = 200;
var height = 200;

var m4 = new m4x();
var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

var seed = 44;

function draw() {
	background([1, 1, 1, 1]);
	m4.random_seed(seed);
	for (var i = 0; i < width; i++) {
		var rand_num = m4.random();
		mg.set_source_rgb(rand_num, rand_num, rand_num);
		mg.move_to(i, 0);
		mg.line_to(i, height);
		mg.stroke();
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function background(c) {
	mg.set_source_rgba(c);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
