var { isInstanceOfM4X } = require('util');
var { constants } = require('constants');

var helperMethods = {
	create_vector: function (x, y, z) {
		if (isInstanceOfM4X(this)) {
			return new m4x.Vector(this, arguments);
		} else {
			return new m4x.Vector(x, y, z);
		}
	},

	color_mode: function () {
		if (typeof arguments[0] !== 'string') {
			error('color_mode: first argument must specify the color mode and be of type: string');
		} else {
			var valid_modes = [constants.RGB, constants.HSB, constants.HSL];
			if (valid_modes.indexOf(arguments[0]) < 0)
				error('color_mode: ' + arguments[0] + ' is not a valid mode. Color mode must be either: RGB, HSB, or HSL');
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
			error('color_mode: invalid arguments');
		}
	},

	color: function (r, g, b, a) {
		if (isInstanceOfM4X(this)) {
			return new m4x.Color(this, arguments);
		} else {
			return new m4x.Color(r, g, b, a);
		}
	},
};

exports.helpers = helperMethods;
