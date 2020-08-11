var lcg = (function () {
	// Linear Congruential Generator
	// Variant of a Lehman Generator
	// Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
	// m is basically chosen to be large (as it is the max period)
	// and for its relationships to a and c
	var m = 4294967296;
	// a - 1 should be divisible by m's prime factors
	var a = 1664525;
	// c and m should be co-prime
	var c = 1013904223;
	var seed;
	var z;
	return {
		setSeed: function (val) {
			// pick a random seed if val is undefined or null
			// the >>> 0 casts the seed to an unsigned 32-bit integer
			z = seed = (val == null ? Math.random() * m : val) >>> 0;
		},
		getSeed: function () {
			return seed;
		},
		rand: function () {
			// define the recurrence relationship
			z = (a * z + c) % m;
			// return a float in [0, 1)
			// if z = m then z / m = 0 therefore (z % m) / m < 1 always
			return z / m;
		},
	};
})();

function everyNumberIsFinite(arr) {
	for (var i = 0; i < arr.length; arr++) {
		if (typeof arr[i] !== 'number' || !isFinite(arr[i])) {
			return false;
		}
	}
	return true;
}

function containsZero(arr) {
	for (var i = 0; i < arr.length; arr++) {
		if (arr[i] === 0) {
			return true;
		}
	}
	return false;
}

function isInstanceOf(inst, name) {
	return inst && name && typeof inst === 'object' && inst.constructor && inst.constructor.name === name;
}

function isInstanceOfM4X(inst) {
	return isInstanceOf(inst, 'm4x');
}
function isInstanceOfGenerativeDesign(inst) {
	return isInstanceOf(inst, 'GenerativeDesign');
}

exports.lcg = lcg;
exports.everyNumberIsFinite = everyNumberIsFinite;
exports.containsZero = containsZero;
exports.isInstanceOf = isInstanceOf;
exports.isInstanceOfM4X = isInstanceOfM4X;
exports.isInstanceOfGenerativeDesign = isInstanceOfGenerativeDesign;
