// https://github.com/processing/p5.js/blob/main/src/math/noise.js

var { lcg } = require('util');

var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

// var this.perlin_octaves = 4; // default to medium smooth
// var this.perlin_amp_falloff = 0.5; // 50% reduction/octave
// var this.perlin; // will be initialized lazily by noise()

var noiseMethods = {
	/**
	 * Returns the Perlin noise value at specified coordinates. Perlin noise is
	 * a random sequence generator producing a more naturally ordered, harmonic
	 * succession of numbers compared to the standard random() function.
	 * It was invented by Ken Perlin in the 1980s and been used since in
	 * graphical applications to produce procedural textures, natural motion,
	 * shapes, terrains etc.
	 *
	 * The main difference to the random() function is that Perlin noise is defined in an infinite
	 * n-dimensional space where each pair of coordinates corresponds to a
	 * fixed semi-random value. noise() can compute 1D, 2D and 3D noise,
	 * depending on the number of coordinates given. The resulting value will
	 * always be between 0.0 and 1.0. The noise value can be animated by moving
	 * through the noise space as demonstrated in the example above. The 2nd
	 * and 3rd dimension can also be interpreted as time.
	 *
	 * The actual noise is structured similar to an audio signal, in respect to the
	 * function's use of frequencies. Similar to the concept of harmonics in
	 * physics, this.perlin noise is computed over several octaves which are added
	 * together for the final result.
	 *
	 * Another way to adjust the character of the resulting sequence is the scale of the input
	 * coordinates. As the function works within an infinite space the value of
	 * the coordinates doesn't matter as such, only the distance between
	 * successive coordinates does (eg. when using noise() within a
	 * loop). As a general rule the smaller the difference between coordinates,
	 * the smoother the resulting noise sequence will be. Steps of 0.005-0.03
	 * work best for most applications, but this will differ depending on use.
	 *
	 * @method noise
	 * @param  {Number} x   x-coordinate in noise space
	 * @param  {Number} [y] y-coordinate in noise space
	 * @param  {Number} [z] z-coordinate in noise space
	 * @return {Number}     Perlin noise value (between 0 and 1) at specified
	 *                      coordinates
	 */

	perlin_octaves: 4,
	perlin_amp_falloff: 0.5,
	perlin: null,

	noise: function (x, y, z) {
		y = y || 0;
		z = z || 0;

		if (!this.perlin) {
			this.perlin = [];
			for (var i = 0; i < PERLIN_SIZE + 1; i++) {
				this.perlin[i] = Math.random();
			}
		}

		if (x < 0) {
			x = -x;
		}
		if (y < 0) {
			y = -y;
		}
		if (z < 0) {
			z = -z;
		}

		var xi = Math.floor(x);
		var yi = Math.floor(y);
		var zi = Math.floor(z);
		var xf = x - xi;
		var yf = y - yi;
		var zf = z - zi;
		var rxf, ryf;

		var r = 0;
		var ampl = 0.5;

		var n1, n2, n3;

		for (var o = 0; o < this.perlin_octaves; o++) {
			var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

			rxf = scaled_cosine(xf);
			ryf = scaled_cosine(yf);

			n1 = this.perlin[of & PERLIN_SIZE];
			n1 += rxf * (this.perlin[(of + 1) & PERLIN_SIZE] - n1);
			n2 = this.perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
			n2 += rxf * (this.perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
			n1 += ryf * (n2 - n1);

			of += PERLIN_ZWRAP;
			n2 = this.perlin[of & PERLIN_SIZE];
			n2 += rxf * (this.perlin[(of + 1) & PERLIN_SIZE] - n2);
			n3 = this.perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
			n3 += rxf * (this.perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
			n2 += ryf * (n3 - n2);

			n1 += scaled_cosine(zf) * (n2 - n1);

			r += n1 * ampl;
			ampl *= this.perlin_amp_falloff;
			xi <<= 1;
			xf *= 2;
			yi <<= 1;
			yf *= 2;
			zi <<= 1;
			zf *= 2;

			if (xf >= 1.0) {
				xi++;
				xf--;
			}
			if (yf >= 1.0) {
				yi++;
				yf--;
			}
			if (zf >= 1.0) {
				zi++;
				zf--;
			}
		}
		return r;
	},

	/**
	 *
	 * Adjusts the character and level of detail produced by the Perlin noise
	 * function. Similar to harmonics in physics, noise is computed over
	 * several octaves. Lower octaves contribute more to the output signal and
	 * as such define the overall intensity of the noise, whereas higher octaves
	 * create finer grained details in the noise sequence.
	 *
	 * By default, noise is computed over 4 octaves with each octave contributing
	 * exactly half than its predecessor, starting at 50% strength for the 1st
	 * octave. This falloff amount can be changed by adding an additional function
	 * parameter. Eg. a falloff factor of 0.75 means each octave will now have
	 * 75% impact (25% less) of the previous lower octave. Any value between
	 * 0.0 and 1.0 is valid, however note that values greater than 0.5 might
	 * result in greater than 1.0 values returned by noise()
	 * By changing these parameters, the signal created by the noise()
	 * function can be adapted to fit very specific needs and characteristics.
	 *
	 * @method noise_detail
	 * @param {Number} lod 			number of octaves to be used by the noise
	 * @param {Number} falloff 	falloff factor for each octave
	 */

	noise_detail: function (lod, falloff) {
		if (lod > 0) {
			this.perlin_octaves = lod;
		}
		if (falloff > 0) {
			this.perlin_amp_falloff = falloff;
		}
	},

	/**
	 * Sets the seed value for noise(). By default, noise()
	 * produces different results each time the program is run. Set the
	 * value parameter to a constant to return the same pseudo-random
	 * numbers each time the software is run.
	 *
	 * @method noise_seed
	 * @param {Number} seed   the seed value
	 */

	noise_seed: function (seed) {
		lcg.setSeed(seed);
		this.perlin = [];
		for (var i = 0; i < PERLIN_SIZE + 1; i++) {
			this.perlin[i] = lcg.rand();
		}
	},
};

function scaled_cosine(i) {
	return 0.5 * (1.0 - Math.cos(i * Math.PI));
}

exports.noise = noiseMethods;
