var { constants } = require('constants');
var { calculation } = require('m4x.calculation');
var { noise } = require('m4x.noise');
var { random } = require('m4x.random');
var { Vector } = require('m4x.Vector');
var { ColorConverter } = require('m4x.color.converter');
var { Color } = require('m4x.Color');

function bindToClass(functionsObject, thisClass) {
	for (var methodName in functionsObject) {
		var method = functionsObject[methodName];
		if (typeof method === 'function') {
			thisClass[methodName] = method.bind(thisClass);
		}
	}
}

var m4xMethods = [calculation, noise, random, ColorConverter];
var m4xSubClasses = [Vector, Color];

function m4x() {
	this.seeded = false;
	this.color_properties = {
		mode: constants.RGB,
		MAX_1: 255,
		MAX_2: 255,
		MAX_3: 255,
		MAX_4: 255,
	};

	bindToClass(calculation, this);
	bindToClass(random, this);
	bindToClass(noise, this);
	bindToClass(ColorConverter, this);
}

m4x.prototype.create_vector = function (x, y, z) {
	if (this instanceof m4x) {
		return new m4x.Vector(this, arguments);
	} else {
		return new m4x.Vector(x, y, z);
	}
};

m4x.Vector = Vector;
m4x.Color = Color;

/////////////////////// COLOR //////////////////////////////

m4x.prototype.lerp_color = function (col1, col2, a) {
	var mix1 = this.lerp(col1[0], col2[0], a);
	var mix2 = this.lerp(col1[1], col2[1], a);
	var mix3 = this.lerp(col1[2], col2[2], a);
	var mix4 = this.lerp(col1[3], col2[3], a);
	return this.color(mix1, mix2, mix3, mix4);
};

m4x.prototype.load_image = function (img) {
	return new Image(this.img);
};

m4x.prototype.color_mode = function () {
	if (typeof arguments[0] !== 'string') {
		error('m4x.prototype.color_mode: first argument must specify the color mode and be of type: string');
	} else {
		var valid_modes = [constants.RGB, constants.HSB, constants.HSL];
		if (valid_modes.indexOf(arguments[0]) < 0)
			error('m4x.prototype.color_mode: ' + arguments[0] + ' is not a valid mode. Color mode must be either: RGB, HSB, or HSL');
	}
	if (arguments.length === 1) {
		// only mode specified, set all props to defaults
		this.color_properties.mode = arguments[0];
		switch (arguments[0]) {
			case constants.RGB:
				this.color_properties.MAX_1 = 255;
				this.color_properties.MAX_2 = 255;
				this.color_properties.MAX_3 = 255;
				this.color_properties.MAX_4 = 255;
				break;
			case constants.HSL:
			case constants.HSB:
				this.color_properties.MAX_1 = 360;
				this.color_properties.MAX_2 = 100;
				this.color_properties.MAX_3 = 100;
				this.color_properties.MAX_4 = 100;
		}
	} else if (arguments.length === 2) {
		// mode and one value specified, set all props to value
		this.color_properties.mode = arguments[0];
		this.color_properties.MAX_1 = arguments[1];
		this.color_properties.MAX_2 = arguments[1];
		this.color_properties.MAX_3 = arguments[1];
		this.color_properties.MAX_4 = arguments[1];
	} else if (arguments.length === 4) {
		// mode and 3 value specified, set alpha to default value
		this.color_properties.mode = arguments[0];
		this.color_properties.MAX_1 = arguments[1];
		this.color_properties.MAX_2 = arguments[2];
		this.color_properties.MAX_3 = arguments[3];
		this.color_properties.MAX_4 = arguments[0] === constants.RGB ? 255 : 100;
	} else if (arguments.length === 5) {
		this.color_properties.mode = arguments[0];
		this.color_properties.MAX_1 = arguments[1];
		this.color_properties.MAX_2 = arguments[2];
		this.color_properties.MAX_3 = arguments[3];
		this.color_properties.MAX_4 = arguments[4];
	} else {
		error('m4x.prototype.color_mode: invalid arguments');
	}
};

m4x.prototype.color = function (r, g, b, a) {
	if (this instanceof m4x) {
		return new m4x.Color(this, arguments);
	} else {
		return new m4x.Color(r, g, b, a);
	}
};

exports.m4x = m4x;
