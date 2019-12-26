
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