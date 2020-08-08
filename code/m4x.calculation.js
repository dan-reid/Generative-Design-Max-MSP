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

var calculationMethods = {
	constrain: function (val, min, max) {
		return Math.min(Math.max(val, min), max);
	},
	dist: function () {
		if (arguments.length === 4) {
			return hypot(arguments[2] - arguments[0], arguments[3] - arguments[1]);
		} else if (arguments.length === 6) {
			return hypot(arguments[3] - arguments[0], arguments[4] - arguments[1], arguments[5] - arguments[2]);
		}
	},
	lerp: function (start, stop, amt) {
		return amt * (stop - start) + start;
	},
	mag: function (x, y) {
		return hypot(x, y);
	},
	radians: function (degrees) {
		return (degrees * Math.PI) / 180;
	},
	degrees: function (radians) {
		return (radians * 180) / Math.PI;
	},
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
	norm: function (n, start, stop) {
		return this.map(n, start, stop, 0, 1);
	},
	lerp_color: function (col1, col2, a) {
		var mix1 = this.lerp(col1[0], col2[0], a);
		var mix2 = this.lerp(col1[1], col2[1], a);
		var mix3 = this.lerp(col1[2], col2[2], a);
		var mix4 = this.lerp(col1[3], col2[3], a);
		return this.color(mix1, mix2, mix3, mix4);
	},
};

exports.calculation = calculationMethods;
