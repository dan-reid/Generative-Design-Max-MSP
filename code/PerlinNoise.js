function PerlinNoise(x, y, z) {
    var PERLIN_YWRAPB = 4;
    var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
    var PERLIN_ZWRAPB = 8;
    var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
    var PERLIN_SIZE = 4095;

    var perlin_octaves = 4; // default to medium smooth
    var perlin_amp_falloff = 0.5; // 50% reduction/octave
    var perlin; // will be initialized lazily by noise() or noise_seed()

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
 * Sets the seed value for noise(). By default, noise()
 * produces different results each time the program is run. Set the
 * <b>value</b> parameter to a constant to return the same pseudo-random
 * numbers each time the software is run.
 */

PerlinNoise.prototype.seed = function (seed) {
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

PerlinNoise.prototype.set_detail = function (lod, falloff) {
    if (lod > 0) {
        perlin_octaves = lod;
    }
    if (falloff > 0) {
        perlin_amp_falloff = falloff;
    }
};

exports.PerlinNoise = PerlinNoise;
