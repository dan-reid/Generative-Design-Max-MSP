function PClone() {
  this.seeded = false;
  this.color_mode = ('RGB');
};



/////////////////////// MATH //////////////////////////////

/*
********************** Calculations **************************
*/

PClone.prototype.constrain = function (val, min, max) {
  return Math.min(Math.max(val, min), max);
};

PClone.prototype.dist = function () {
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

PClone.prototype.lerp = function (start, stop, amt) {
  return amt * (stop - start) + start;
};

PClone.prototype.mag = function (x, y) {
  return hypot(x, y);
};

PClone.prototype.radians = function (degrees) {
  return degrees * Math.PI / 180;
};

PClone.prototype.degrees = function (radians) {
  return radians * 180 / Math.PI;
};

PClone.prototype.map = function (n, start1, stop1, start2, stop2, withinBounds) {
  var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return this.constrain(newval, start2, stop2);
  } else {
    return this.constrain(newval, stop2, start2);
  }
};

PClone.prototype.norm = function (n, start, stop) {
  return this.map(n, start, stop, 0, 1);
};


/*
********************** random() **********************
*/

PClone.prototype.random = function (min, max) {
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
};

PClone.prototype.randomseed = function (seed) {
  lcg.setSeed(seed);
  this.seeded = true;
  previous = false;
};


/*
****************** noise() **********************
*/
var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

var perlin_octaves = 4; // default to medium smooth
var perlin_amp_falloff = 0.5; // 50% reduction/octave
var perlin; // will be initialized lazily by noise() or noise_seed()

PClone.prototype.noise = function (x, y, z) {
  y = y || 0;
  z = z || 0;

  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
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

  var xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  var xf = x - xi;
  var yf = y - yi;
  var zf = z - zi;
  var rxf, ryf;

  var r = 0;
  var ampl = 0.5;

  var n1, n2, n3;

  for (var o = 0; o < perlin_octaves; o++) {
    var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
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
};

/**
 *
 * Adjusts the character and level of detail produced by the Perlin noise
 * function. Similar to harmonics in physics, noise is computed over
 * several octaves. Lower octaves contribute more to the output signal and
 * as such define the overall intensity of the noise, whereas higher octaves
 * create finer grained details in the noise sequence.
 * <br><br>
 * By default, noise is computed over 4 octaves with each octave contributing
 * exactly half than its predecessor, starting at 50% strength for the 1st
 * octave. This falloff amount can be changed by adding an additional function
 * parameter. Eg. a falloff factor of 0.75 means each octave will now have
 * 75% impact (25% less) of the previous lower octave. Any value between
 * 0.0 and 1.0 is valid, however note that values greater than 0.5 might
 * result in greater than 1.0 values returned by noise()
 * By changing these parameters, the signal created by the noise()
 * function can be adapted to fit very specific needs and characteristics.
 */

PClone.prototype.noise_detail = function (lod, falloff) {
  if (lod > 0) {
    perlin_octaves = lod;
  }
  if (falloff > 0) {
    perlin_amp_falloff = falloff;
  }
};

/**
 * Sets the seed value for noise(). By default, noise()
 * produces different results each time the program is run. Set the
 * <b>value</b> parameter to a constant to return the same pseudo-random
 * numbers each time the software is run.
 */

PClone.prototype.noise_seed = function (seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  var lcg = (function () {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    var a = 1664525;
    // c and m should be co-prime
    var c = 1013904223;
    var seed, z;
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
}


/***************************** Vector *********************************/

PClone.prototype.create_vector = function (x, y, z) {
  if (this instanceof PClone) {
    return new PClone.Vector(this, arguments);
  } else {
    return new PClone.Vector(x, y, z);
  }
};

PClone.Vector = function Vector() {
  var x, y, z;
  // This is how it comes in with create_vector()
  if (arguments[0] instanceof PClone) {
    // save reference to PClone if passed in
    this.PClone = arguments[0];
    x = arguments[1][0] || 0;
    y = arguments[1][1] || 0;
    z = arguments[1][2] || 0;

    // This is what we'll get with new p5.Vector()
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
};

PClone.Vector.prototype.set = function set(x, y, z) {
  if (x instanceof PClone.Vector) {
    this.x = x.x || 0;
    this.y = x.y || 0;
    this.z = x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x = x[0] || 0;
    this.y = x[1] || 0;
    this.z = x[2] || 0;
    return this;
  }
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  return this;
};

PClone.Vector.prototype.copy = function copy() {
  return new PClone.Vector(this.x, this.y, this.z);
};


PClone.Vector.prototype.add = function add(x, y, z) {
  if (x instanceof PClone.Vector) {
    this.x += x.x || 0;
    this.y += x.y || 0;
    this.z += x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x += x[0] || 0;
    this.y += x[1] || 0;
    this.z += x[2] || 0;
    return this;
  }
  this.x += x || 0;
  this.y += y || 0;
  this.z += z || 0;
  return this;
};

PClone.Vector.prototype.sub = function sub(x, y, z) {
  if (x instanceof PClone.Vector) {
    this.x -= x.x || 0;
    this.y -= x.y || 0;
    this.z -= x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x -= x[0] || 0;
    this.y -= x[1] || 0;
    this.z -= x[2] || 0;
    return this;
  }
  this.x -= x || 0;
  this.y -= y || 0;
  this.z -= z || 0;
  return this;
};

PClone.Vector.prototype.mult = function mult(n) {
  if (!(typeof n === 'number' && isFinite(n))) {
    error(
      'PClone.Vector.prototype.mult:',
      'n is undefined or not a finite number'
    );
    return this;
  }
  this.x *= n;
  this.y *= n;
  this.z *= n;
  return this;
};

/**
 * Divide the vector by a scalar. The static version of this method creates a
 * new PClone.Vector while the non static version acts on the vector directly.
 */
PClone.Vector.prototype.div = function div(n) {
  if (!(typeof n === 'number' && isFinite(n))) {
    error(
      'PClone.Vector.prototype.div:',
      'n is undefined or not a finite number'
    );
    return this;
  }
  if (n === 0) {
    error('PClone.Vector.prototype.div:', 'divide by 0');
    return this;
  }
  this.x /= n;
  this.y /= n;
  this.z /= n;
  return this;
};

/**
 * Calculates the magnitude (length) of the vector and returns the result as
 * a float (this is simply the equation sqrt(x*x + y*y + z*z).)
 */

PClone.Vector.prototype.mag = function mag() {
  return Math.sqrt(this.magsq());
};

/**
 * Calculates the squared magnitude of the vector and returns the result
 * as a float (this is simply the equation (x*x + y*y + z*z)
 * Faster if the real length is not required in the
 * case of comparing vectors, etc.
 */

PClone.Vector.prototype.magsq = function magsq() {
  var x = this.x;
  var y = this.y;
  var z = this.z;
  return x * x + y * y + z * z;
};

/**
 * Calculates the dot product of two vectors. The version of the method
 * that computes the dot product of two independent vectors is a static
 * method. See the examples for more context.
 */

PClone.Vector.prototype.dot = function dot(x, y, z) {
  if (x instanceof PClone.Vector) {
    return this.dot(x.x, x.y, x.z);
  }
  return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
};

/**
 * Calculates and returns a vector composed of the cross product between
 * two vectors. Both the static and non static methods return a new PClone.Vector.
 * See the examples for more context.
 */

PClone.Vector.prototype.cross = function cross(v) {
  var x = this.y * v.z - this.z * v.y;
  var y = this.z * v.x - this.x * v.z;
  var z = this.x * v.y - this.y * v.x;
  if (this.PClone) {
    return new PClone.Vector(this.PClone, [x, y, z]);
  } else {
    return new PClone.Vector(x, y, z);
  }
};

/**
 * Calculates the Euclidean distance between two points (considering a
 * point as a vector object).
 */

PClone.Vector.prototype.dist = function dist(v) {
  return v
    .copy()
    .sub(this)
    .mag();
};



/**
 * Normalize the vector to length 1 (make it a unit vector).
 */

PClone.Vector.prototype.normalize = function normalize() {
  var len = this.mag();
  // here we multiply by the reciprocal instead of calling 'div()'
  // since div duplicates this zero check.
  if (len !== 0) this.mult(1 / len);
  return this;
};

/**
 * Limit the magnitude of this vector to the value used for the <b>max</b>
 * parameter.
 */

PClone.Vector.prototype.limit = function limit(max) {
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

PClone.Vector.prototype.set_mag = function set_mag(n) {
  return this.normalize().mult(n);
};

/**
 * Calculate the angle of rotation for this vector (only 2D vectors)
 */

PClone.Vector.prototype.heading = function heading() {
  var h = Math.atan2(this.y, this.x);
  if (this.PClone) return this.radians(h);
  return h;
};

/**
 * Rotate the vector by an angle (only 2D vectors), magnitude remains the
 * same
 */

PClone.Vector.prototype.rotate = function rotate(a) {
  var newHeading = this.heading() + a;
  if (this.PClone) newHeading = this.radians(newHeading);
  var mag = this.mag();
  this.x = Math.cos(newHeading) * mag;
  this.y = Math.sin(newHeading) * mag;
  return this;
};

/**
 * Calculates and returns the angle (in radians) between two vectors.
 */

PClone.Vector.prototype.angle_between = function angle_between(v) {
  var dotmagmag = this.dot(v) / (this.mag() * v.mag());
  // Mathematically speaking: the dotmagmag variable will be between -1 and 1
  // inclusive. Practically though it could be slightly outside this range due
  // to floating-point rounding issues. This can make Math.acos return NaN.
  //
  // Solution: we'll clamp the value to the -1,1 range
  var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
  if (this.PClone) return this.radians(angle);
  return angle;
};

/**
 * Linear interpolate the vector to another vector
 */

PClone.Vector.prototype.lerp = function lerp(x, y, z, amt) {
  if (x instanceof PClone.Vector) {
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

PClone.Vector.prototype.array = function array() {
  return [this.x || 0, this.y || 0, this.z || 0];
};


/**
 * Equality check against a PClone.Vector
 */

PClone.Vector.prototype.equals = function equals(x, y, z) {
  var a, b, c;
  if (x instanceof PClone.Vector) {
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

PClone.Vector.from_angle = function from_angle(angle, length) {
  if (typeof length === 'undefined') {
    length = 1;
  }
  return new PClone.Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
};

/**
 * Make a new 3D vector from a pair of ISO spherical angles
 */

PClone.Vector.from_angles = function (theta, phi, length) {
  if (typeof length === 'undefined') {
    length = 1;
  }
  var cosPhi = Math.cos(phi);
  var sinPhi = Math.sin(phi);
  var cosTheta = Math.cos(theta);
  var sinTheta = Math.sin(theta);

  return new PClone.Vector(
    length * sinTheta * sinPhi,
    -length * cosTheta,
    length * sinTheta * cosPhi
  );
};

/**
 * Make a new 2D unit vector from a random angle
 */

PClone.Vector.random2D = function random2D() {
  return this.from_angle(Math.random() * (Math.PI * 2));
};

/**
 * Make a new random 3D unit vector.
 */

PClone.Vector.random3D = function random3D() {
  var angle = Math.random() * (Math.PI * 2);
  var vz = Math.random() * 2 - 1;
  var vzBase = Math.sqrt(1 - vz * vz);
  var vx = vzBase * Math.cos(angle);
  var vy = vzBase * Math.sin(angle);
  return new PClone.Vector(vx, vy, vz);
};

// Adds two vectors together and returns a new one.

PClone.Vector.add = function add(v1, v2, target) {
  if (!target) {
    target = v1.copy();
  } else {
    target.set(v1);
  }
  target.add(v2);
  return target;
};

/*
* Subtracts one PClone.Vector from another and returns a new one.  The second
* vector (v2) is subtracted from the first (v1), resulting in v1-v2.
*/

PClone.Vector.sub = function sub(v1, v2, target) {
  if (!target) {
    target = v1.copy();
  } else {
    target.set(v1);
  }
  target.sub(v2);
  return target;
};

/**
 * Multiplies a vector by a scalar and returns a new vector.
 */

PClone.Vector.mult = function mult(v, n, target) {
  if (!target) {
    target = v.copy();
  } else {
    target.set(v);
  }
  target.mult(n);
  return target;
};

/**
 * Divides a vector by a scalar and returns a new vector.
 */

PClone.Vector.div = function div(v, n, target) {
  if (!target) {
    target = v.copy();
  } else {
    target.set(v);
  }
  target.div(n);
  return target;
};

/**
 * Calculates the dot product of two vectors.
 */

PClone.Vector.dot = function dot(v1, v2) {
  return v1.dot(v2);
};

/**
 * Calculates the cross product of two vectors.
 */

PClone.Vector.cross = function cross(v1, v2) {
  return v1.cross(v2);
};

/**
 * Calculates the Euclidean distance between two points (considering a
 * point as a vector object).
 */

PClone.Vector.dist = function dist(v1, v2) {
  return v1.dist(v2);
};

/**
 * Linear interpolate a vector to another vector and return the result as a
 * new vector.
 */

PClone.Vector.lerp = function lerp(v1, v2, amt, target) {
  if (!target) {
    target = v1.copy();
  } else {
    target.set(v1);
  }
  target.lerp(v2, amt);
  return target;
};

PClone.Vector.mag = function mag(vecT) {
  var x = vecT.x,
    y = vecT.y,
    z = vecT.z;
  var magsq = x * x + y * y + z * z;
  return Math.sqrt(magsq);
};



/////////////////////// COLOR //////////////////////////////
///////////////////////////////////////////////////////////

/**
 * Convert an HSBA array to HSLA.
 */
PClone.prototype.hsba_to_hsla = function (hsba) {

  if (!(arguments[0] instanceof Array)) {
    error('PClone.prototype.hsba_to_hsla:',
      'input should be an array of normalized [H,S,B,A]');
    post();
    return null;
  }

  var hue = hsba[0];
  var sat = hsba[1];
  var val = hsba[2];

  // if the array is missing the alpha channel
  // we just set it to 1;
  if (typeof hsba[3] === 'undefined') {
    hsba[3] = 1;
  }

  // Calculate lightness.
  var li = (2 - sat) * val / 2;

  // Convert saturation.
  if (li !== 0) {
    if (li === 1) {
      sat = 0;
    } else if (li < 0.5) {
      sat = sat / (2 - sat);
    } else {
      sat = sat * val / (2 - li * 2);
    }
  }
  // Hue and alpha stay the same.
  return [hue, sat, li, hsba[3]];

};

PClone.prototype.hsb_to_hsl = function (hsb) {
  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.hsb_to_hsl expects an array of normalized [H,S,B] as input");
    post();
    return null;
  }
  var hsla = this.hsba_to_hsla(hsb);
  return hsla.slice(0, 3);
}

/**
 * Convert an HSLA array to RGBA.
 *
 * We need to change basis from HSLA to something that can be more easily be
 * projected onto RGBA. We will choose hue and brightness as our first two
 * components, and pick a convenient third one ('zest') so that we don't need
 * to calculate formal HSBA saturation.
 */
PClone.prototype.hsla_to_rgba = function (hsla) {

  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.hsla_to_rgba expects an array of normalized [H,S,L,A] as input");
    post();
    return null;
  }

  var hue = hsla[0] * 6; // We will split hue into 6 sectors.
  var sat = hsla[1];
  var li = hsla[2];

  // if the array is missing the alpha channel
  // we just set it to 1;
  if (typeof hsla[3] === 'undefined') {
    hsla[3] = 1;
  }

  var RGBA = [];

  if (sat === 0) {
    RGBA = [li, li, li, hsla[3]]; // Return early if grayscale.
  } else {
    // Calculate brightness.
    var val;
    if (li < 0.5) {
      val = (1 + sat) * li;
    } else {
      val = li + sat - li * sat;
    }

    // Define zest.
    var zest = 2 * li - val;

    // Implement projection (project onto green by default).
    var hzvToRGB = function (hue, zest, val) {
      if (hue < 0) {
        // Hue must wrap to allow projection onto red and blue.
        hue += 6;
      } else if (hue >= 6) {
        hue -= 6;
      }
      if (hue < 1) {
        // Red to yellow (increasing green).
        return zest + (val - zest) * hue;
      } else if (hue < 3) {
        // Yellow to cyan (greatest green).
        return val;
      } else if (hue < 4) {
        // Cyan to blue (decreasing green).
        return zest + (val - zest) * (4 - hue);
      } else {
        // Blue to red (least green).
        return zest;
      }
    };

    // Perform projections, offsetting hue as necessary.
    RGBA = [
      hzvToRGB(hue + 2, zest, val),
      hzvToRGB(hue, zest, val),
      hzvToRGB(hue - 2, zest, val),
      hsla[3]
    ];
  }
};

PClone.prototype.hsl_to_rgb = function (hsl) {
  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.hsl_to_rgb expects an array of normalized [H,S,L] as input");
    post();
    return null;
  }
  var rgba = this.hsla_to_rbga(hsl);
  return rgba.slice(0, 3);
}

/**
 * Convert an RGBA array to HSBA array.
 */
PClone.rgba_to_hsba = function (rgba) {
  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.rgba_to_hsba expects an array of normalized [R,G,B,A] as input");
    post();
    return null;
  }
  var red = rgba[0];
  var green = rgba[1];
  var blue = rgba[2];

  if (typeof rgba[3] === 'undefined') {
    rgba[3] = 1;
  }

  var val = Math.max(red, green, blue);
  var chroma = val - Math.min(red, green, blue);

  var hue, sat;
  if (chroma === 0) {
    // Return early if grayscale.
    hue = 0;
    sat = 0;
  } else {
    sat = chroma / val;
    if (red === val) {
      // Magenta to yellow.
      hue = (green - blue) / chroma;
    } else if (green === val) {
      // Yellow to cyan.
      hue = 2 + (blue - red) / chroma;
    } else if (blue === val) {
      // Cyan to magenta.
      hue = 4 + (red - green) / chroma;
    }
    if (hue < 0) {
      // Confine hue to the interval [0, 1).
      hue += 6;
    } else if (hue >= 6) {
      hue -= 6;
    }
  }
  return [hue / 6, sat, val, rgba[3]];
};

PClone.prototype.rgb_to_hsb = function (rgb) {
  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.rgb_to_hsb expects an array of normalized [R,G,B] as input");
    post();
    return null;
  }
  var hsba = this.rgba_to_hsba(rgb);
  return hsba.slice(0, 3);
}

/**
 * Convert an HSBA array to RGBA.
 */
PClone.prototype.hsba_to_rgba = function (hsba) {

  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.hsba_to_rgba expects an array of normalized [H,S,B,A] as input");
    post();
    return null;
  }

  var hue = hsba[0] * 6; // We will split hue into 6 sectors.
  var sat = hsba[1];
  var val = hsba[2];

  if (typeof hsba[3] === 'undefined') {
    hsba[3] = 1;
  }

  var RGBA = [];

  if (sat === 0) {
    RGBA = [val, val, val, hsba[3]]; // Return early if grayscale.
  } else {
    var sector = Math.floor(hue);
    var tint1 = val * (1 - sat);
    var tint2 = val * (1 - sat * (hue - sector));
    var tint3 = val * (1 - sat * (1 + sector - hue));
    var red, green, blue;
    if (sector === 1) {
      // Yellow to green.
      red = tint2;
      green = val;
      blue = tint1;
    } else if (sector === 2) {
      // Green to cyan.
      red = tint1;
      green = val;
      blue = tint3;
    } else if (sector === 3) {
      // Cyan to blue.
      red = tint1;
      green = tint2;
      blue = val;
    } else if (sector === 4) {
      // Blue to magenta.
      red = tint3;
      green = tint1;
      blue = val;
    } else if (sector === 5) {
      // Magenta to red.
      red = val;
      green = tint1;
      blue = tint2;
    } else {
      // Red to yellow (sector could be 0 or 6).
      red = val;
      green = tint3;
      blue = tint1;
    }
    RGBA = [red, green, blue, hsba[3]];
  }

  return RGBA;
};

PClone.prototype.hsb_to_rgb = function (hsb) {
  if (!(arguments[0] instanceof Array)) {
    error("PClone.prototype.hsb_to_rgb expects an array of normalized [H,S,B] as input");
    post();
    return null;
  }

  var hsba = [hsb[0], hsb[1], hsb[2], 1];
  var rgba = this.hsba_to_rgba(hsba);
  return rgba.slice(0, 3);
}

PClone.prototype.set_color_mode = function(mode) {

}

PClone.Color = function (c1, c2, c3, c4) {

  

  this.channel_1;
  this.channel_2;
  this.channel_3;
  this.channel_4;

  if (arguments[0] instanceof Array) {
    this.channel_1 = arguments[0][0] || 0;
    this.channel_2 = arguments[0][1] || 0;
    this.channel_3 = arguments[0][2] || 0;
    this.channel_4 = arguments[0][3] || 100;
  } else {
    this.channel_1 = c1 || 0;
    this.channel_2 = c2 || 0;
    this.channel_3 = c3 || 0;
    this.channel_4 = c4 || 100;
  }


  

  PClone.Color.set_color_mode(mode, max_c1, max_c2, max_c3, max_4) = function() {
    if (mode.toLowCase() === 'hsb' || mode.toLowCase() === 'hsl') {
      this.max_value_1 = max_c1 || 360;
      this.max_value_2 = max_c2 || 100;
      this.max_value_3 = max_c3 || 100;
      this.max_value_4 = max_c4 || 100;
    } else if(mode.toLowCase() === 'rgb') {
      this.max_value_1 = max_c1 || 360;
      this.max_value_2 = max_c2 || 100;
      this.max_value_3 = max_c3 || 100;
      this.max_value_4 = max_c4 || 100;
    }
  }

  PClone.Color.normalize = function () {
        this.channel_1 / this.max_value_1;
        this.channel_2 / this.max_value_2;
        this.channel_3 / this.max_value_3;
        this.channel_4 / this.max_value_4;
  }

}




// Linear Congruential Generator
// Variant of a Lehman Generator
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

var scaled_cosine = function (i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
};
