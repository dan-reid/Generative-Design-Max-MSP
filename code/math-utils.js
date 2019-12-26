
exports.constrain = function (val, min, max) {
    return Math.min(Math.max(val, min), max);
};

exports.dist = function () {
    if (arguments.length === 4) {
        return hypot(arguments[2] - arguments[0], arguments[3] - arguments[1]);
    } else if (arguments.length === 6) {
        return hypot(
            arguments[3] - arguments[0],
            arguments[4] - arguments[1],
            arguments[5] - arguments[2]
        );
    }
};

exports.lerp = function (start, stop, amt) {
    return amt * (stop - start) + start;
};

exports.mag = function (x, y) {
    return hypot(x, y);
};

exports.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

exports.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

exports.map = function (n, start1, stop1, start2, stop2, withinBounds) {
    var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return exports.constrain(newval, start2, stop2);
    } else {
        return exports.constrain(newval, stop2, start2);
    }
};

exports.norm = function (n, start, stop) {
    return exports.map(n, start, stop, 0, 1);
};

var lcg = (function () {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296,
      // a - 1 should be divisible by m's prime factors
      a = 1664525,
      // c and m should be co-prime
      c = 1013904223,
      seed,
      z;
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
      }
    };
  })();

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
