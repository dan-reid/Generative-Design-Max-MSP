// https://p5js.org/reference/#/p5/noiseDetail

/**
 * @method noise_detail(lod, falloff)
 *
 * Adjusts the character and level of detail produced by the Perlin noise function.
 * Similar to harmonics in physics, noise is computed over several octaves.
 * Lower octaves contribute more to the output signal and as such define the
 * overall intensity of the noise, whereas higher octaves create finer grained
 * details in the noise sequence. By default, noise is computed over 4 octaves
 * with each octave contributing exactly half than its predecessor, starting at
 * 50% strength for the 1st octave. This falloff amount can be changed by adding
 * an additional function parameter. Eg. a falloff factor of 0.75 means each octave
 * will now have 75% impact (25% less) of the previous lower octave. Any value between
 * 0.0 and 1.0 is valid, however note that values greater than 0.5 might result in
 * greater than 1.0 values returned by noise(). By changing these parameters, the
 * signal created by the noise() function can be adapted to fit very specific needs
 * and characteristics.
 *
 * Parameters
 *
 * @param {number} lod      number of octaves to be used by the noise
 * @param {number} falloff  falloff factor for each octave
 *
 */

include('gd.mouseinfo');
var { m4x } = require('m4x');

var width = 100;
var height = 100;

var m4 = new m4x();
var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

function draw() {
	background([1, 1, 1, 1]);

	var noise_scale = 0.02;
	var noise_val;

	for (var y = 0; y < height; y += 2) {
		for (var x = 0; x < width / 2; x += 2) {
			m4.noise_detail(2, 0.2);
			noise_val = m4.noise((mousex + x) * noise_scale, (mousey + y) * noise_scale);
			mg.set_source_rgb(noise_val, noise_val, noise_val);
			mg.ellipse(x, y, 2, 2);
			mg.fill();

			m4.noise_detail(8, 0.65);
			noise_val = m4.noise((mousex + x + width / 2) * noise_scale, (mousey + y) * noise_scale);
			mg.set_source_rgb(noise_val, noise_val, noise_val);
			mg.rectangle(x + width / 2, y, 2, 2);
			mg.fill();
		}
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
