var { constants } = require('constants');
var { calculation } = require('m4x.calculation');
var { noise } = require('m4x.noise');
var { random } = require('m4x.random');
var { ColorConverter } = require('m4x.color.converter');
var { helpers } = require('m4x.helpers');

var { Vector } = require('m4x.Vector');
var { Color } = require('m4x.Color');

function m4x() {
	this.seeded = false;
	this.color_properties = {
		mode: constants.RGB,
		MAX_1: 255,
		MAX_2: 255,
		MAX_3: 255,
		MAX_4: 255,
	};

	var methodObjects = [calculation, noise, random, ColorConverter, helpers];

	for (var i = 0; i < methodObjects.length; i++) {
		var obj = methodObjects[i];
		for (var key in obj) {
			var prop = obj[key];
			if (typeof prop === 'function') {
				this[key] = prop.bind(this);
			} else {
				this[key] = prop;
			}
		}
	}
}

var classes = [Vector, Color];
for (var i = 0; i < classes.length; i++) {
	var theClass = classes[i];
	if (theClass.name) {
		m4x[theClass.name] = theClass;
	}
}

exports.m4x = m4x;
