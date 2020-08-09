var { isInstanceOfM4X } = require('util');
var { constants } = require('constants');

function Color() {
	var self = [];
	if (isInstanceOfM4X(arguments[0])) {
		self.push.apply(self, arguments[1]);
		self.__proto__ = Color.prototype;
		self.m4 = arguments[0];
		self.props = self.color_properties;
	} else {
		error('Color: calling new Color() directly is not supported. Use m4x.color()');
	}

	if (!self[3]) {
		self[3] = self.m4.color_properties.MAX_4;
	}

	self.red = self[0] || 0;
	self.green = self[1] || 0;
	self.blue = self[2] || 0;

	self.hue = self[0] || 0;
	self.saturation = self[1] || 0;
	self.brightness = self[2] || 0;
	self.luminosity = self[2] || 0;
	self.alpha = self[3];
	return self;
}

Color.prototype = new Array();

Color.prototype.normalize = function () {
	this[0] = this.m4.map(this[0], 0, this.m4.color_properties.MAX_1, 0, 1);
	this[1] = this.m4.map(this[1], 0, this.m4.color_properties.MAX_2, 0, 1);
	this[2] = this.m4.map(this[2], 0, this.m4.color_properties.MAX_3, 0, 1);
	this[3] = this.m4.map(this[3], 0, this.m4.color_properties.MAX_4, 0, 1);
	return this;
};

Color.prototype.to_hsb = function () {
	var a = [this[0], this[1], this[2], this[3]];
	if (this.get_mode() === constants.HSB) {
		return this;
	} else if (this.get_mode() === constants.RGB) {
		var rgb = this.m4.rgba_to_hsba(a);
		return this.m4.color(rgb[0], rgb[1], rgb[2], rgb[3]);
	} else if (this.get_mode() === constants.HSL) {
		var rgb = this.m4.hsla_to_hsba(a);
		return this.m4.color(rgb[0], rgb[1], rgb[2], rgb[3]);
	} else {
		error('Color.prototype.to_hsb: invalid color_mode: ' + this.get_mode() + '\n');
	}
};

Color.prototype.to_rgb = function () {
	var a = [this[0], this[1], this[2], this[3]];
	if (this.get_mode() === constants.RGB) {
		return this;
	} else if (this.get_mode() === constants.HSB) {
		var rgb = this.m4.hsba_to_rgba(a);
		return this.m4.color(rgb[0], rgb[1], rgb[2], rgb[3]);
	} else if (this.get_mode() === constants.HSL) {
		var rgb = this.m4.hsla_to_rgba(a);
		return this.m4.color(rgb[0], rgb[1], rgb[2], rgb[3]);
	} else {
		error('Color.prototype.to_rgb: invalid color_mode: ' + this.get_mode() + '\n');
	}
};

Color.prototype.to_hsl = function () {
	var a = [this[0], this[1], this[2], this[3]];
	if (this.get_mode() === constants.HSL) {
		return this;
	} else if (this.get_mode() === constants.HSB) {
		var rgb = this.m4.hsba_to_hsla(a);
		return this.m4.color(rgb[0], rgb[1], rgb[2], rgb[3]);
	} else if (this.get_mode() === constants.RGB) {
		var rgb = this.m4.rgba_to_hsla(a);
		return this.m4.color(rgb[0], rgb[1], rgb[2], rgb[3]);
	} else {
		error('Color.prototype.to_hsl: invalid color_mode: ' + this.get_mode() + '\n');
	}
};

Color.prototype.get_props = function () {
	return this.m4.color_properties;
};

Color.prototype.get_mode = function () {
	return this.m4.color_properties.mode;
};

/**
 * Returns the red channel
 */

Color.prototype.get_red = function () {
	if (this.get_mode() !== constants.RGB) {
		error('Color.prototype.get_red: you are accessing an RGB property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.red;
};

/**
 * Returns the green channel
 */

Color.prototype.get_green = function () {
	if (this.get_mode() !== constants.RGB) {
		error('Color.prototype.get_green: you are accessing an RGB property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.green;
};

/**
 * Returns the blue channel
 */

Color.prototype.get_blue = function () {
	if (this.get_mode() !== constants.RGB) {
		error('Color.prototype.get_blue: you are accessing an RGB property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.blue;
};

/**
 * Returns the hue value
 */

Color.prototype.get_hue = function () {
	if (this.get_mode() !== constants.HSB) {
		error('Color.prototype.get_hue: you are accessing a HSB property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.hue;
};

/**
 * Returns the saturation value
 */

Color.prototype.get_saturation = function () {
	if (this.get_mode() !== constants.HSB) {
		error('Color.prototype.get_saturation: you are accessing a HSB property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.saturation;
};

/**
 * Returns the brightness value
 */

Color.prototype.get_brightness = function () {
	if (this.get_mode() !== constants.HSB) {
		error('Color.prototype.get_brightness: you are accessing a HSB property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.brightness;
};

/**
 * Returns the luminosity value
 */

Color.prototype.get_luminosity = function () {
	if (this.get_mode() !== constants.HSL) {
		error('Color.prototype.get_luminosity: you are accessing a HSL property but color_mode is currently set to ' + this.get_mode() + '\n');
	}
	return this.luminosity;
};

/**
 * Returns the alpha value
 */

Color.prototype.get_alpha = function () {
	return this.alpha;
};

exports.Color = Color;
