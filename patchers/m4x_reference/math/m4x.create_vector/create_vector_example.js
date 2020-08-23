// https://p5js.org/reference/#/p5/createVector

/**
 * Creates a new m4x.Vector (the datatype for storing vectors).
 * This provides a two or three dimensional vector, specifically a
 * Euclidean (also known as geometric) vector.
 *
 * A vector is an entity that has both magnitude and direction.
 *
 * @method create_vector([x], [y], [z])
 *
 * Parameters
 * @param   {number} [x]   x component of the vector (Optional)
 * @param   {number} [y]   y component of the vector (Optional)
 * @param   {number} [z]   z component of the vector (Optional)
 *
 * @returns {m4x.Vector}   An instance of an m4x.Vector
 */

include('m4x.mouseinfo');

var width = 150;
var height = 150;

var { m4x } = require('m4x');
var m4 = new m4x();

var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

var vec = m4.create_vector(width / 2, height / 2);

function draw() {
	background([1, 1, 1, 1]);

	var col = m4.color(255, 0, 255);

	mg.set_source_rgb(col);
	mg.move_to(vec.x, vec.y);
	mg.line_to(mousex, mousey);
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
