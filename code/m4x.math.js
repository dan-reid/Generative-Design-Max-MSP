var { isInstanceOfM4X } = require('util');

var mathMethods = {
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
};

exports.math = mathMethods;
