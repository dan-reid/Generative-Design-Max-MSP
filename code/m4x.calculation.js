var calculationMethods = {
	/**
	 * @method constrain
	 * @param  {Number} val  number to constrain
	 * @param  {Number} low  minimum limit
	 * @param  {Number} high maximum limit
	 * @return {Number}      constrained number
	 */

	constrain: function (val, min, max) {
		return Math.min(Math.max(val, min), max);
	},

	/**
	 * @method dist
	 * @param  {Number} x1
	 * @param  {Number} y1
	 * @param  {Number} z1 z-coordinate of the first point
	 * @param  {Number} x2
	 * @param  {Number} y2
	 * @param  {Number} z2 z-coordinate of the second point
	 * @return {Number}    distance between the two points
	 */

	dist: function () {
		if (arguments.length === 4) {
			return hypot(arguments[2] - arguments[0], arguments[3] - arguments[1]);
		} else if (arguments.length === 6) {
			return hypot(arguments[3] - arguments[0], arguments[4] - arguments[1], arguments[5] - arguments[2]);
		}
	},

	/**
	 * @method lerp
	 * @param  {Number} start first value
	 * @param  {Number} stop  second value
	 * @param  {Number} amt   number
	 * @return {Number}       lerped value
	 */

	lerp: function (start, stop, amt) {
		return amt * (stop - start) + start;
	},

	/**
	 * @method mag
	 * @param  {Number} a first value
	 * @param  {Number} b second value
	 * @return {Number}   magnitude of vector from (0,0) to (a,b)
	 */

	mag: function (x, y) {
		return hypot(x, y);
	},

	/**
	 * @method radians
	 * @param  {Number} degrees the degree value to convert to radians
	 * @return {Number}         the converted angle
	 */

	radians: function (degrees) {
		return (degrees * Math.PI) / 180;
	},

	/**
	 * @method degrees
	 * @param  {Number} radians the radians value to convert to degrees
	 * @return {Number}         the converted angle
	 */

	degrees: function (radians) {
		return (radians * 180) / Math.PI;
	},

	/**
	 *
	 * @method map
	 * @param  {Number} value  the incoming value to be converted
	 * @param  {Number} start1 lower bound of the value's current range
	 * @param  {Number} stop1  upper bound of the value's current range
	 * @param  {Number} start2 lower bound of the value's target range
	 * @param  {Number} stop2  upper bound of the value's target range
	 * @param  {Boolean} [withinBounds] constrain the value to the newly mapped range
	 * @return {Number}        remapped number
	 */

	map: function (n, start1, stop1, start2, stop2, withinBounds) {
		var newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
		if (!withinBounds) {
			return newval;
		}
		if (start2 < stop2) {
			return this.constrain(newval, start2, stop2);
		} else {
			return this.constrain(newval, stop2, start2);
		}
	},

	/**
	 *
	 * @method norm
	 * @param  {Number} n incoming value to be normalized
	 * @param  {Number} start lower bound of the value's current range
	 * @param  {Number} stop  upper bound of the value's current range
	 * @return {Number}       normalized number
	 */

	norm: function (n, start, stop) {
		return this.map(n, start, stop, 0, 1);
	},

	/**
	 *
	 * @method lerp_color
	 * @param  {m4x.Color} c1  interpolate from this color
	 * @param  {m4x.Color} c2  interpolate to this color
	 * @param  {Number}    a 	 number between 0 and 1
	 * @return {m4x.Color}     interpolated color
	 */

	lerp_color: function (col1, col2, a) {
		var mix1 = this.lerp(col1[0], col2[0], a);
		var mix2 = this.lerp(col1[1], col2[1], a);
		var mix3 = this.lerp(col1[2], col2[2], a);
		var mix4 = this.lerp(col1[3], col2[3], a);
		return this.color(mix1, mix2, mix3, mix4);
	},
};

function hypot(x, y, z) {
	var length = arguments.length;
	var args = [];
	var max = 0;
	for (var i = 0; i < length; i++) {
		var n = arguments[i];
		n = +n;
		if (n === Infinity || n === -Infinity) {
			return Infinity;
		}
		n = Math.abs(n);
		if (n > max) {
			max = n;
		}
		args[i] = n;
	}

	if (max === 0) {
		max = 1;
	}
	var sum = 0;
	var compensation = 0;
	for (var j = 0; j < length; j++) {
		var m = args[j] / max;
		var summand = m * m - compensation;
		var preliminary = sum + summand;
		compensation = preliminary - sum - summand;
		sum = preliminary;
	}
	return Math.sqrt(sum) * max;
}

exports.calculation = calculationMethods;
