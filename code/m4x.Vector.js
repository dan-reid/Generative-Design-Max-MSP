// https://github.com/processing/p5.js/blob/main/src/math/p5.Vector.js

var { isInstanceOfM4X, isInstanceOf, everyNumberIsFinite, containsZero } = require('util');

function Vector() {
	var x, y, z;
	this.m4 = null;
	// This is how it comes in with m4x.create_vector()
	if (isInstanceOfM4X(arguments[0])) {
		// save reference to M4X if passed in
		this.m4 = arguments[0];
		x = arguments[1][0] || 0;
		y = arguments[1][1] || 0;
		z = arguments[1][2] || 0;

		// This is what we'll get with new Vector()
	} else {
		x = arguments[0] || 0;
		y = arguments[1] || 0;
		z = arguments[2] || 0;
	}

	/**
	 * The x component of the vector
	 */
	this.x = x;
	/**
	 * The y component of the vector
	 */
	this.y = y;
	/**
	 * The z component of the vector
	 */
	this.z = z;
}

Vector.prototype.set = function (x, y, z) {
	if (x instanceof Vector) {
		this.x = x.x || 0;
		this.y = x.y || 0;
		this.z = x.z || 0;
		return this;
	} else if (x instanceof Array) {
		this.x = x[0] || 0;
		this.y = x[1] || 0;
		this.z = x[2] || 0;
		return this;
	} else {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		return this;
	}
};

Vector.prototype.copy = function copy() {
	if (this.m4) {
		return this.m4.create_vector(this.x, this.y, this.z);
	}
	return new Vector(this.x, this.y, this.z);
};

Vector.prototype.add = function (x, y, z) {
	if (x instanceof Vector) {
		this.x += x.x || 0;
		this.y += x.y || 0;
		this.z += x.z || 0;
		return this;
	} else if (x instanceof Array) {
		this.x += x[0] || 0;
		this.y += x[1] || 0;
		this.z += x[2] || 0;
		return this;
	} else {
		this.x += x || 0;
		this.y += y || 0;
		this.z += z || 0;
		return this;
	}
};

Vector.prototype.sub = function sub(x, y, z) {
	if (x instanceof Vector) {
		this.x -= x.x || 0;
		this.y -= x.y || 0;
		this.z -= x.z || 0;
		return this;
	} else if (x instanceof Array) {
		this.x -= x[0] || 0;
		this.y -= x[1] || 0;
		this.z -= x[2] || 0;
		return this;
	} else {
		this.x -= x || 0;
		this.y -= y || 0;
		this.z -= z || 0;
		return this;
	}
};

/**
 * @method mult
 * @param  {Number} x The number to multiply with the x component of the vector
 * @param  {Number} y The number to multiply with the y component of the vector
 * @param  {Number} [z] The number to multiply with the z component of the vector
 * @chainable
 */

/**
 * @method mult
 * @param  {Number[]} arr The array to multiply with the components of the vector
 * @chainable
 */

/**
 * @method mult
 * @param  {Vector} v The vector to multiply with the components of the original vector
 * @chainable
 */

Vector.prototype.mult = function (x, y, z) {
	if (x instanceof Vector) {
		if (typeof x.x === 'number' && typeof x.y === 'number' && typeof x.z === 'number' && isFinite(x.x) && isFinite(x.y) && isFinite(x.z)) {
			this.x *= x.x;
			this.y *= x.y;
			this.z *= x.z;
		} else {
			error('Vector.prototype.mult: the passed Vector contains components that are either undefined or not finite numbers + \n');
		}
		return this;
	}

	if (x instanceof Array) {
		if (everyNumberIsFinite(x)) {
			if (x.length === 1) {
				this.x *= x[0];
				this.y *= x[0];
				this.z *= x[0];
			} else if (x.length === 2) {
				this.x *= x[0];
				this.y *= x[1];
			} else if (x.length === 3) {
				this.x *= x[0];
				this.y *= x[1];
				this.z *= x[2];
			}
		} else {
			error('Vector.prototype.mult: the passed array contains components that are either undefined or not finite numbers + \n');
		}
		return this;
	}

	if (everyNumberIsFinite(arguments)) {
		if (arguments.length === 1) {
			this.x *= x;
			this.y *= x;
			this.z *= x;
		} else if (arguments.length === 2) {
			this.x *= x;
			this.y *= y;
		} else if (arguments.length === 3) {
			this.x *= x;
			this.y *= y;
			this.z *= z;
		} else {
			error('Vector.prototype.mult: one or more of the arguments are either undefined or not finite numbers + \n');
		}
		return this;
	}

	error('Vector.prototype.mult: one or more of the given arguments: ' + x + 'were invalid \n');
	return this;
};

/**
 * Divide the vector by a scalar. The static version of this method creates a
 * new Vector while the non static version acts on the vector directly.
 */
Vector.prototype.div = function div(x, y, z) {
	if (x instanceof Vector) {
		if (typeof x.x === 'number' && typeof x.y === 'number' && typeof x.z === 'number' && isFinite(x.x) && isFinite(x.y) && isFinite(x.z)) {
			if (x.x === 0 || x.y === 0 || x.z === 0) {
				error('Vector.prototype.div: the passed Vector contains a 0 + \n');
				return this;
			}
			this.x /= x.x;
			this.y /= x.y;
			this.z /= x.z;
		} else {
			error('Vector.prototype.div: the passed Vector contains components that are either undefined or not finite numbers + \n');
		}
		return this;
	}

	if (x instanceof Array) {
		if (everyNumberIsFinite(x)) {
			if (containsZero(x)) {
				error('Vector.prototype.div: the passed Array contains a 0 + \n');
				return this;
			}
			if (x.length === 1) {
				this.x /= x[0];
				this.y /= x[0];
				this.z /= x[0];
			} else if (x.length === 2) {
				this.x /= x[0];
				this.y /= x[1];
			} else if (x.length === 3) {
				this.x /= x[0];
				this.y /= x[1];
				this.z /= x[2];
			}
		} else {
			error('Vector.prototype.div: the passed array contains components that are either undefined or not finite numbers \n');
		}
		return this;
	}

	if (everyNumberIsFinite(arguments)) {
		if (containsZero(arguments)) {
			error('Vector.prototype.div: one of the given arguments is 0 \n');
			return this;
		}
		if (arguments.length === 1) {
			this.x /= x;
			this.y /= x;
			this.z /= x;
		} else if (arguments.length === 2) {
			this.x /= x;
			this.y /= y;
		} else if (arguments.length === 3) {
			this.x /= x;
			this.y /= y;
			this.z /= z;
		} else {
			error('Vector.prototype.div: one or more of the arguments are either undefined or not finite numbers \n');
		}
		return this;
	}

	error('Vector.prototype.div: one or more of the given arguments were invalid \n');
	return this;
};

/**
 * Calculates the magnitude (length) of the vector and returns the result as
 * a float (this is simply the equation sqrt(x*x + y*y + z*z))
 * @method mag
 * @return {Number} magnitude of the vector
 */

Vector.prototype.mag = function () {
	return Math.sqrt(this.magsq());
};

/**
 * Calculates the squared magnitude of the vector and returns the result
 * as a float (this is simply the equation (x*x + y*y + z*z)
 * Faster if the real length is not required in the
 * case of comparing vectors, etc.
 *
 * @method magsq
 * @return {number} squared magnitude of the vector
 */

Vector.prototype.magsq = function () {
	return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 * Calculates the dot product of two vectors. The version of the method
 * that computes the dot product of two independent vectors is a static
 * method. See the examples for more context.
 */

Vector.prototype.dot = function dot(x, y, z) {
	if (x instanceof Vector) {
		return this.dot(x.x, x.y, x.z);
	}
	return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
};

/**
 * Calculates and returns a vector composed of the cross product between
 * two vectors. Both the static and non static methods return a new Vector.
 * See the examples for more context.
 */

Vector.prototype.cross = function cross(v) {
	var x = this.y * v.z - this.z * v.y;
	var y = this.z * v.x - this.x * v.z;
	var z = this.x * v.y - this.y * v.x;
	if (this.m4) {
		return new Vector(this.m4, [x, y, z]);
	} else {
		return new Vector(x, y, z);
	}
};

/**
 * Calculates the Euclidean distance between two points (considering a
 * point as a vector object).
 */

Vector.prototype.dist = function dist(v) {
	return v.copy().sub(this).mag();
};

/**
 * Normalize the vector to length 1 (make it a unit vector).
 */

Vector.prototype.normalize = function normalize() {
	var len = this.mag();
	// here we multiply by the reciprocal instead of calling 'div()'
	// since div duplicates this zero check.
	if (len !== 0) {
		this.mult(1 / len);
	}
	return this;
};

/**
 * Limit the magnitude of this vector to the value used for the <b>max</b>
 * parameter.
 *
 * @method limit
 * @param  {Number}    max the maximum magnitude for the vector
 * @chainable
 */

Vector.prototype.limit = function limit(max) {
	var mSq = this.magsq();
	if (mSq > max * max) {
		this.div(Math.sqrt(mSq)) //normalize it
			.mult(max);
	}
	return this;
};

/**
 * Set the magnitude of this vector to the value used for the <b>len</b>
 * parameter.
 */

Vector.prototype.set_mag = function set_mag(n) {
	return this.normalize().mult(n);
};

/**
 * Calculate the angle of rotation for this vector (only 2D vectors)
 */

Vector.prototype.heading = function heading() {
	var h = Math.atan2(this.y, this.x);
	if (this.m4) return this.radians(h);
	return h;
};

/**
 * Rotate the vector by an angle (only 2D vectors), magnitude remains the
 * same
 */

Vector.prototype.rotate = function rotate(a) {
	var newHeading = this.heading() + a;
	if (this.m4) newHeading = this.radians(newHeading);
	var mag = this.mag();
	this.x = Math.cos(newHeading) * mag;
	this.y = Math.sin(newHeading) * mag;
	return this;
};

/**
 * Calculates and returns the angle (in radians) between two vectors.
 */

Vector.prototype.angle_between = function angle_between(v) {
	var dotmagmag = this.dot(v) / (this.mag() * v.mag());
	// Mathematically speaking: the dotmagmag variable will be between -1 and 1
	// inclusive. Practically though it could be slightly outside this range due
	// to floating-point rounding issues. This can make Math.acos return NaN.
	//
	// Solution: we'll clamp the value to the -1,1 range
	var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
	if (this.m4) return this.radians(angle);
	return angle;
};

/**
 * Linear interpolate the vector to another vector
 */

Vector.prototype.lerp = function lerp(x, y, z, amt) {
	if (x instanceof Vector) {
		return this.lerp(x.x, x.y, x.z, y);
	}
	this.x += (x - this.x) * amt || 0;
	this.y += (y - this.y) * amt || 0;
	this.z += (z - this.z) * amt || 0;
	return this;
};

/**
 * Return a representation of this vector as a float array.
 */

Vector.prototype.array = function array() {
	return [this.x || 0, this.y || 0, this.z || 0];
};

/**
 * Equality check against a Vector
 */

Vector.prototype.equals = function equals(x, y, z) {
	var a, b, c;
	if (x instanceof Vector) {
		a = x.x || 0;
		b = x.y || 0;
		c = x.z || 0;
	} else if (x instanceof Array) {
		a = x[0] || 0;
		b = x[1] || 0;
		c = x[2] || 0;
	} else {
		a = x || 0;
		b = y || 0;
		c = z || 0;
	}
	return this.x === a && this.y === b && this.z === c;
};

// Static Methods //

/**
 * Make a new 2D vector from an angle
 */

Vector.from_angle = function from_angle(angle, length) {
	if (typeof length === 'undefined') {
		length = 1;
	}
	return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
};

/**
 * Make a new 3D vector from a pair of ISO spherical angles
 */

Vector.from_angles = function (theta, phi, length) {
	if (typeof length === 'undefined') {
		length = 1;
	}
	var cosPhi = Math.cos(phi);
	var sinPhi = Math.sin(phi);
	var cosTheta = Math.cos(theta);
	var sinTheta = Math.sin(theta);

	return new Vector(length * sinTheta * sinPhi, -length * cosTheta, length * sinTheta * cosPhi);
};

/**
 * Make a new 2D unit vector from a random angle
 */

Vector.random2D = function random2D() {
	return this.from_angle(Math.random() * (Math.PI * 2));
};

/**
 * Make a new random 3D unit vector.
 */

Vector.random3D = function random3D() {
	var angle = Math.random() * (Math.PI * 2);
	var vz = Math.random() * 2 - 1;
	var vzBase = Math.sqrt(1 - vz * vz);
	var vx = vzBase * Math.cos(angle);
	var vy = vzBase * Math.sin(angle);
	return new Vector(vx, vy, vz);
};

// Adds two vectors together and returns a new one.

Vector.add = function add(v1, v2, target) {
	if (!target) {
		target = v1.copy();
	} else {
		target.set(v1);
	}
	target.add(v2);
	return target;
};

/**
 * Subtracts one Vector from another and returns a new one.  The second
 * vector (v2) is subtracted from the first (v1), resulting in v1-v2.
 * @static
 * @param  {Vector} v1 a Vector to subtract from
 * @param  {Vector} v2 a Vector to subtract
 * @param  {Vector} [target] the vector to receive the result (Optional)
 * @return {Vector} the resulting Vector
 */

Vector.sub = function sub(v1, v2, target) {
	if (!target) {
		target = v1.copy();
		if (arguments.length === 3) {
			error('m4x.Vector: The target parameter is undefined, it should be of type m4x.Vector');
		}
	} else {
		target.set(v1);
	}
	target.sub(v2);
	return target;
};

/**
 * Multiplies a vector by a scalar and returns a new vector.
 */

Vector.mult = function mult(v, n, target) {
	if (!target) {
		target = v.copy();
		if (arguments.length === 3) {
			error('m4x.Vector: The target parameter is undefined, it should be of type m4x.Vector');
		}
	} else {
		target.set(v);
	}
	target.mult(n);
	return target;
};

/**
 * Divides a vector by a scalar and returns a new vector.
 */

Vector.div = function div(v, n, target) {
	if (!target) {
		target = v.copy();
		if (arguments.length === 3) {
			error('m4x.Vector: The target parameter is undefined, it should be of type m4x.Vector');
		}
	} else {
		target.set(v);
	}
	target.div(n);
	return target;
};

/**
 * Calculates the dot product of two vectors.
 */

Vector.dot = function dot(v1, v2) {
	return v1.dot(v2);
};

/**
 * Calculates the cross product of two vectors.
 */

Vector.cross = function cross(v1, v2) {
	return v1.cross(v2);
};

/**
 * Calculates the Euclidean distance between two points (considering a
 * point as a vector object).
 */

Vector.dist = function dist(v1, v2) {
	return v1.dist(v2);
};

/**
 * Linear interpolate a vector to another vector and return the result as a
 * new vector.
 */

Vector.lerp = function lerp(v1, v2, amt, target) {
	if (!target) {
		target = v1.copy();
	} else {
		target.set(v1);
	}
	target.lerp(v2, amt);
	return target;
};

Vector.mag = function mag(vecT) {
	var x = vecT.x,
		y = vecT.y,
		z = vecT.z;
	var magsq = x * x + y * y + z * z;
	return Math.sqrt(magsq);
};

exports.Vector = Vector;
