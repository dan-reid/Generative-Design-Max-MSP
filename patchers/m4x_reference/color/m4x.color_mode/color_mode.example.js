// https://p5js.org/reference/#/p5/colorMode

autowatch = 1;

/**
 * @method color_mode(mode, [max])
 * @method color_mode(mode, max1, max2, max3, [maxA])
 *
 * color_mode() changes the way m4x interprets color data.
 * By default, values between are defined 0 and 255 using the RGB color model.
 * This is equivalent to setting colorMode(RGB, 255). Setting colorMode(HSB) lets you use the HSB system instead.
 * By default, this is colorMode(HSB, 360, 100, 100, 1). You can also use HSL
 *
 * Note: existing color objects remember the mode that they were created in,
 * so you can change modes as you like without affecting their appearance.
 *
 * Parameters
 * @param {string} mode either RGB, HSB or HSL, corresponding to Red/Green/Blue and Hue/Saturation/Brightness (or Lightness)
 * @param {number} max  If only one number is supplied, it sets the range for all values
 * @param {number} max1 range for the red or hue depending on the current color mode
 * @param {number} max2 range for the green or saturation depending on the current color mode
 * @param {number} max3 range for the blue or brightness/lightness depending on the current color mode
 * @param {number} maxA range for the alpha (Optional)
 *
 */

var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;

var width = 200;
var height = 200;

var color_mode = 'RGB';

setup();

function setup() {
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();
}

function draw() {
	background(1, 1, 1, 1);
	m4.color_mode(color_mode, 200);

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var col = m4.color(x, y, color_mode === 'RGB' ? 0 : 200);

			// m4x.Color will adjust its values interally to ensure they are compatible with mgraphics, regardless of color_mode
			mg.set_source_rgba(col);
			mg.ellipse(x, y, 1, 1);
			mg.fill();
		}
	}

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
