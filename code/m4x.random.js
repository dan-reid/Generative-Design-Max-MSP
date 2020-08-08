var { lcg } = require('util');

var randomMethods = {
	random: function (min, max) {
		var rand;
		if (this.seeded) {
			rand = lcg.rand();
		} else {
			rand = Math.random();
		}
		if (typeof min === 'undefined') {
			return rand;
		} else if (typeof max === 'undefined') {
			if (min instanceof Array) {
				return min[Math.floor(rand * min.length)];
			} else {
				return rand * min;
			}
		} else {
			if (min > max) {
				var tmp = min;
				min = max;
				max = tmp;
			}
			return rand * (max - min) + min;
		}
	},
	randomseed: function (seed) {
		lcg.setSeed(seed);
		this.seeded = true;
	},
};

exports.random = randomMethods;
