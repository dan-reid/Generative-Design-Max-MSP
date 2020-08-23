// https://p5js.org/reference/#/p5/noise

/**
 * @method noise(x, [y], [z])
 *
 * Returns the Perlin noise value at specified coordinates.
 * Perlin noise is a random sequence generator producing a more
 * naturally ordered, harmonic succession of numbers compared to the
 * standard random() function. It was invented by Ken Perlin in
 * the 1980s and been used since in graphical applications to
 * produce procedural textures, natural motion, shapes, terrains etc.
 *
 * Parameters
 *
 * @param {number} x    x-coordinate in noise space
 * @param {number} [y]  y-coordinate in noise space (Optional)
 * @param {number} [z]  z-coordinate in noise space (Optional)
 *
 * @returns {number}    Perlin noise value (between 0 and 1) at specified coordinates
 */

include('gd.mouseinfo');
var { m4x } = require('m4x');

var width = 200;
var height = 200;

var m4 = new m4x();
var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

function draw() {
	background([1, 1, 1, 1]);

	var noise_scale = 0.02;
	for (var x = 0; x < width; x++) {
		var noise_val = m4.noise((mousex + x) * noise_scale, mousey * noise_scale);
		var col = m4.color(51, 51, 51, noise_val * 255);
		mg.set_source_rgba(col);
		mg.move_to(x, mousey + noise_val * 80);
		mg.line_to(x, height);
		mg.stroke();
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
