autowatch = 1;

/**
 * @method color(gray, [alpha])
 * @method color(v1, v2, v3, [alpha])
 *
 * Creates colors for storing in variables of the color datatype.
 * The parameters are interpreted as RGB or HSB values depending on the current color_mode().
 * The default mode is RGB values from 0 to 255 and, therefore, the function call color(255, 204, 0)
 * will return a bright yellow color.
 *
 * Note that if only one value is provided to color(), it will be interpreted as a grayscale value.
 * Add a second value, and it will be used for alpha transparency. When three values are specified,
 * they are interpreted as either RGB or HSB values. Adding a fourth value applies alpha transparency.
 *
 * Regardless of color_mode, the m4x.Color() class will adjust its values internally to ensure they are compatible with mgraphics
 *
 * Parameters
 * @param {number} gray     number specifying value between white and black.
 * @param {number} [alpha]  alpha value relative to current color range (default is 0-255) (Optional)
 * @param {number} v1       red or hue value relative to the current color range
 * @param {number} v2       green or saturation value relative to the current color range
 * @param {number} v3       blue or brightness value relative to the current color range
 *
 * @returns {m4x.Color}
 *
 */

var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;

var width = 200;
var height = 200;

setup();

function setup() {
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();
}

function draw_example_1() {
	background(1, 1, 1, 1);

	var col = m4.color(255, 204, 0);

	mg.set_source_rgba(col);
	mg.rectangle(60, 40, 110, 110);
	mg.fill();

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function draw_example_2() {
	background(1, 1, 1, 1);

	var col1 = m4.color(255, 204, 0);
	var col2 = m4.color(65); // Using only one value generates a grayscale value.

	var diameter = 160;
	var radius = diameter / 2;

	mg.set_source_rgba(col1);
	mg.ellipse(50 - radius, 50 - radius, 160, 160);
	mg.fill();

	mg.set_source_rgba(col2);
	mg.ellipse(150 - radius, 150 - radius, 160, 160);
	mg.fill();

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
