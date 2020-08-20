// https://p5js.org/reference/#/p5/noiseSeed

/**
 * @method noise_seed(seed)
 *
 * Sets the seed value for noise(). By default, noise() produces different results each time the program is run.
 * Set the value parameter to a constant to return the same pseudo-random numbers each time the software is run.
 *
 * Parameters
 *
 * @param {number} seed the seed value
 */

include('gd.mouseinfo');
var { m4x } = require('m4x');

var width = 300;
var height = 300;

var m4 = new m4x();
var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

var xoff = 0;


background([1, 1, 1, 1]);

function draw() {
	m4.noise_seed(99);
	xoff += 0.01;
	var noise = m4.noise(xoff) * width;

	mg.set_source_rgba(0, 0, 0, 0.1);
	mg.move_to(noise, 0);
	mg.line_to(noise, height);
	mg.stroke();

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
