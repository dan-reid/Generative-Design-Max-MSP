// https://github.com/processing/p5.js/blob/main/src/utilities/conversion.js

var ColorConverterMethods = {
	hsba_to_hsla: function (hsba) {
		if (!(arguments[0] instanceof Array)) {
			error('hsba_to_hsla:', 'input should be an array of normalized [H,S,B,A]');
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
		var li = ((2 - sat) * val) / 2;

		// Convert saturation.
		if (li !== 0) {
			if (li === 1) {
				sat = 0;
			} else if (li < 0.5) {
				sat = sat / (2 - sat);
			} else {
				sat = (sat * val) / (2 - li * 2);
			}
		}
		// Hue and alpha stay the same.
		return [hue, sat, li, hsba[3]];
	},

	hsb_to_hsl: function (hsb) {
		if (!(arguments[0] instanceof Array)) {
			error('hsb_to_hsl expects an array of normalized [H,S,B] as input');
			post();
			return null;
		}
		var hsla = this.hsba_to_hsla(hsb);
		return hsla.slice(0, 3);
	},

	/**
	 * Convert an HSLA array to RGBA.
	 *
	 * We need to change basis from HSLA to something that can be more easily be
	 * projected onto RGBA. We will choose hue and brightness as our first two
	 * components, and pick a convenient third one ('zest') so that we don't need
	 * to calculate formal HSBA saturation.
	 */
	hsla_to_rgba: function (hsla) {
		if (!(arguments[0] instanceof Array)) {
			error('PClone.prototype.hsla_to_rgba expects an array of normalized [H,S,L,A] as input');
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
			RGBA = [hzvToRGB(hue + 2, zest, val), hzvToRGB(hue, zest, val), hzvToRGB(hue - 2, zest, val), hsla[3]];
		}
	},

	hsl_to_rgb: function (hsl) {
		if (!(arguments[0] instanceof Array)) {
			error('hsl_to_rgb expects an array of normalized [H,S,L] as input');
			post();
			return null;
		}
		var rgba = this.hsla_to_rbga(hsl);
		return rgba.slice(0, 3);
	},

	/**
	 * Convert an RGBA array to HSBA array.
	 */
	rgba_to_hsba: function (rgba) {
		if (!(arguments[0] instanceof Array)) {
			error('rgba_to_hsba expects an array of normalized [R,G,B,A] as input');
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
	},

	rgb_to_hsb: function (rgb) {
		if (!(arguments[0] instanceof Array)) {
			error('rgb_to_hsb expects an array of normalized [R,G,B] as input');
			post();
			return null;
		}
		var hsba = this.rgba_to_hsba(rgb);
		return hsba.slice(0, 3);
	},

	/**
	 * Convert an HSBA array to RGBA.
	 */
	hsba_to_rgba: function (hsba) {
		if (!(arguments[0] instanceof Array)) {
			error('hsba_to_rgba expects an array of normalized [H,S,B,A] as input');
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
	},

	hsb_to_rgb: function (hsb) {
		if (!(arguments[0] instanceof Array)) {
			error('hsb_to_rgb expects an array of normalized [H,S,B] as input');
			post();
			return null;
		}

		var hsba = [hsb[0], hsb[1], hsb[2], 1];
		var rgba = this.hsba_to_rgba(hsba);
		return rgba.slice(0, 3);
	},
};

exports.ColorConverter = ColorConverterMethods;
