var { isInstanceOfM4X } = require('util');
var { constants } = require('constants');

var helperMethods = {
	/**
	 * Creates a new m4x.Vector (the datatype for storing vectors). This provides a
	 * two or three dimensional vector, specifically a Euclidean (also known as
	 * geometric) vector. A vector is an entity that has both magnitude and
	 * direction.
	 *
	 * @method create_vector
	 * @param {Number} [x] x component of the vector
	 * @param {Number} [y] y component of the vector
	 * @param {Number} [z] z component of the vector
	 * @return {m4x.Vector}
	 */

	create_vector: function (x, y, z) {
		if (isInstanceOfM4X(this)) {
			return new m4x.Vector(this, arguments);
		} else {
			return new m4x.Vector(x, y, z);
		}
	},

	color_properties: {
		mode: constants.RGB,
		maxes: {
			RGB: [255, 255, 255, 255],
			HSB: [360, 100, 100, 100],
			HSL: [360, 100, 100, 100],
		},
	},

	/**
	 *
	 * @method color_mode
	 *
	 * @param {string} 	mode
	 * @param {Number} 	max1     range for the red or hue depending on the current color mode
	 * @param {Number} 	max2     range for the green or saturation depending on the current color mode
	 * @param {Number} 	max3     range for the blue or brightness/lightness depending on the current color mode
	 * @param {Number} 	[maxA]   range for the alpha
	 * @chainable
	 */

	color_mode: function (mode, max1, max2, max3, maxA) {
		if (mode === constants.RGB || mode === constants.HSB || mode === constants.HSL) {
			// Set color mode.
			this.color_properties.mode = mode;
			// Set color maxes.
			if (arguments.length === 2) {
				this.color_properties.maxes[mode][0] = max1; // Red
				this.color_properties.maxes[mode][1] = max1; // Green
				this.color_properties.maxes[mode][2] = max1; // Blue
				this.color_properties.maxes[mode][3] = max1; // Alpha
			} else if (arguments.length === 4) {
				this.color_properties.maxes[mode][0] = max1; // Red
				this.color_properties.maxes[mode][1] = max2; // Green
				this.color_properties.maxes[mode][2] = max3; // Blue
			} else if (arguments.length === 5) {
				this.color_properties.maxes[mode][0] = max1; // Red
				this.color_properties.maxes[mode][1] = max2; // Green
				this.color_properties.maxes[mode][2] = max3; // Blue
				this.color_properties.maxes[mode][3] = maxA; // Alpha
			} else {
				throw new Error('m4x.color_mode: invalid arguments');
			}
		} else {
			throw new Error('m4x.color_mode: ' + mode + ' is not a valid color mode');
		}
		return this;
	},

	/**
	 * Creates a new m4x.Color (the datatype for storing colors).
	 *
	 * @method color
	 * @param {Number} ch1 the value for channel 1
	 * @param {Number} ch2 the value for channel 2
	 * @param {Number} ch3 the value for channel 3
	 * @param {Number} ch4 the value for channel 4
	 * @return {m4x.Color}
	 */

	color: function () {
		if (isInstanceOfM4X(this)) {
			return new m4x.Color(this, arguments);
		} else {
			return new m4x.Color(arguments);
		}
	},
};

exports.helpers = helperMethods;
