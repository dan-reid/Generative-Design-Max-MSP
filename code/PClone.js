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

function PClone() {
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

PClone.prototype.create_vector = function (x, y, z) {
	if (this instanceof PClone) {
		return new PClone.Vector(this, arguments);
	} else {
		return new PClone.Vector(x, y, z);
	}
};

PClone.Vector = Vector;
PClone.Color = Color;

/////////////////////// COLOR //////////////////////////////

PClone.prototype.lerp_color = function (col1, col2, a) {
	var mix1 = pc.lerp(col1[0], col2[0], a);
	var mix2 = pc.lerp(col1[1], col2[1], a);
	var mix3 = pc.lerp(col1[2], col2[2], a);
	var mix4 = pc.lerp(col1[3], col2[3], a);
	return this.color(mix1, mix2, mix3, mix4);
};

PClone.prototype.load_image = function (img) {
	return new Image(this.img);
};

PClone.prototype.color_mode = function () {
	if (typeof arguments[0] !== 'string') {
		error('PClone.prototype.color_mode: first argument must specify the color mode and be of type: string');
	} else {
		var valid_modes = [constants.RGB, constants.HSB, constants.HSL];
		if (valid_modes.indexOf(arguments[0]) < 0)
			error('PClone.prototype.color_mode: ' + arguments[0] + ' is not a valid mode. Color mode must be either: RGB, HSB, or HSL');
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
		error('PClone.prototype.color_mode: invalid arguments');
	}
};

PClone.prototype.color = function (r, g, b, a) {
	if (this instanceof PClone) {
		return new PClone.Color(this, arguments);
	} else {
		return new PClone.Color(r, g, b, a);
	}
};

exports.PClone = PClone;
