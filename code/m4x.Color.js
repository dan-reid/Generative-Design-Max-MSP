var { isInstanceOfM4X } = require('util');
var { constants } = require('constants');

function Color(m4Inst, vals) {
	if (!isInstanceOfM4X(m4Inst)) {
		throw new Error('Color: calling new Color() directly is not supported. Use m4x.color()');
	}

	// in order to make color compatable with mgraphics we need to make Color be of type Array
	var self = [];
	self.push.apply(self, vals);
	self.__proto__ = Color.prototype;
	self.m4Inst = m4Inst;
	self._store_settings(m4Inst.color_properties.mode, m4Inst.color_properties.maxes);
	self._normalize_channels();
	self._calculate_levels();
	return self;
}

Color.prototype = new Array();

Color.prototype._normalize_channels = function () {
	var num_args = this.length;
	var mode = this.mode;
	var maxes = this.maxes[mode];

	if (num_args >= 3) {
		var r = this[0];
		var g = this[1];
		var b = this[2];
		var a = this[3];

		this[0] = r / maxes[0];
		this[1] = g / maxes[1];
		this[2] = b / maxes[2];

		if (typeof a === 'number') {
			this[3] = a / maxes[3];
		} else {
			this[3] = 1;
		}

		var rgba;
		if (mode === constants.RGB) {
			return this;
		} else if (mode === constants.HSL) {
			rgba = this.m4Inst.hsla_to_rgba(this);
		} else if (mode === constants.HSB) {
			rgba = this.m4Inst.hsba_to_rgba(this);
		}

		this[0] = rgba[0];
		this[1] = rgba[1];
		this[2] = rgba[2];
		this[3] = rgba[3];

		return this;
	} else if ((num_args === 1 || num_args === 2) && typeof this[0] === 'number') {
		var val = this[0];
		var a = this[1];

		this[0] = val / maxes[2];
		this[1] = val / maxes[2];
		this[2] = val / maxes[2];

		// Alpha may be undefined, so default it to 100%.
		if (typeof a === 'number') {
			this[3] = a / maxes[3];
		} else {
			this[3] = 1;
		}

		return this;
	} else {
		throw new Error(arguments + ' is not a valid color representation');
	}
};

Color.prototype._store_settings = function (mode, maxes) {
	this.mode = mode;
	this.maxes = maxes;
};

Color.prototype.set_red = function (r) {
	this[0] = r / this.maxes[this.mode][0];
	this._calculate_levels();
};

Color.prototype.set_green = function (g) {
	this[1] = g / this.maxes[this.mode][1];
	this._calculate_levels();
};

Color.prototype.set_blue = function (b) {
	this[2] = b / this.maxes[this.mode][2];
	this._calculate_levels();
};

Color.prototype.set_alpha = function (a) {
	this[3] = a / this.maxes[this.mode][3];
	this._calculate_levels();
};

Color.prototype._calculate_levels = function () {
	const array = [this[0], this[1], this[2], this[3]];
	// (loop backwards for performance)
	const levels = (this.levels = new Array(array.length));
	for (var i = array.length - 1; i >= 0; --i) {
		levels[i] = Math.round(array[i] * 255);
	}
};

Color.prototype._get_maxes = function () {
	return this.maxes;
};

Color.prototype._get_mode = function () {
	return this.mode;
};

Color.prototype._get_red = function () {
	return this[0] * this.maxes[constants.RGB][0];
};

Color.prototype._get_green = function () {
	return this[1] * this.maxes[constants.RGB][1];
};

Color.prototype._get_blue = function () {
	return this[2] * this.maxes[constants.RGB][2];
};

Color.prototype._get_alpha = function () {
	return this[3] * this.maxes[constants.RGB][3];
};

/**
 * Hue is the same in HSB and HSL, but the maximum value may be different.
 * This function will return the HSB-normalized saturation when supplied with
 * an HSB color object, but will default to the HSL-normalized saturation
 * otherwise.
 */

Color.prototype._get_hue = function () {
	if (this.mode === constants.HSB) {
		if (!this.hsba) {
			this.hsba = this.m4Inst.rgba_to_hsba(this);
		}
		return this.hsba[0] * this.maxes[constants.HSB][0];
	} else {
		if (!this.hsla) {
			this.hsba = this.m4Inst.rgba_to_hsla(this);
		}
		return this.hsla[0] * this.maxes[constants.HSL][0];
	}
};

/**
 * Saturation is scaled differently in HSB and HSL. This function will return
 * the HSB saturation when supplied with an HSB color object, but will default
 * to the HSL saturation otherwise.
 */

Color.prototype._get_saturation = function () {
	if (this.mode === constants.HSB) {
		if (!this.hsba) {
			this.hsba = this.m4Inst.rgba_to_hsba(this);
		}
		return this.hsba[1] * this.maxes[constants.HSB][1];
	} else {
		if (!this.hsla) {
			this.hsba = this.m4Inst.rgba_to_hsla(this);
		}
		return this.hsla[1] * this.maxes[constants.HSL][1];
	}
};

Color.prototype._get_brightness = function () {
	if (!this.hsba) {
		this.hsba = this.m4Inst.rgba_to_hsba(this);
	}
	return this.hsba[2] * this.maxes[constants.HSB][2];
};

Color.prototype._get_lightness = function () {
	if (!this.hsla) {
		this.hsla = this.m4Inst.rgba_to_hsla(this);
	}
	return this.hsla[2] * this.maxes[constants.HSL][2];
};

exports.Color = Color;
