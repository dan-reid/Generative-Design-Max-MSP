// https://p5js.org/reference/#/p5/dist

/**
 * Calculates the distance between two points, in either two or three dimensions.
 *
 * @method dist(x1, y1, x2, y2)
 * @method dist(x1, y1, z1, x2, y2, z2)
 *
 * Parameters
 * @param   {number} x1    x-coordinate of the first point
 * @param   {number} y1    y-coordinate of the second point
 * @param   {number} x2    x-coordinate of the first point
 * @param   {number} y2    y-coordinate of the second point
 * @param   {number} z3    z-coordinate of the first point
 * @param   {number} z3    z-coordinate of the second point
 *
 * @returns {number}       distance between the two points
 */

include('m4x.mouseinfo');
outlets = 2;

var width = 200;
var height = 200;

var { m4x } = require('m4x');
var m4 = new m4x();

var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

function draw() {
	background([1, 1, 1, 1]);

	var x1 = 10;
	var y1 = 190;
	var x2 = mousex;
	var y2 = mousey;

	var diameter = 10;
	var r = diameter / 2;

	mg.move_to(x1, y1);
	mg.line_to(x2, y2);
	mg.ellipse(x1 - r, y1 - r, diameter, diameter);
	mg.ellipse(x2 - r, y2 - r, diameter, diameter);
	mg.stroke();

	var dist = Math.floor(m4.dist(x1, y1, x2, y2));

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
	outlet(1, dist);
}

function background(c) {
	mg.set_source_rgba(c);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
