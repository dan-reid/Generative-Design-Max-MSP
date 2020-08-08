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

	var m4xMethodObjects = [calculation, noise, random, ColorConverter, helpers];

	for (var i = 0; i < m4xMethodObjects.length; i++) {
		var methodObject = m4xMethodObjects[i];
		for (var methodName in methodObject) {
			var method = methodObject[methodName];
			if (typeof method === 'function') {
				this[methodName] = method.bind(this);
			}
		}
	}
}

var m4xSubClasses = [Vector, Color];
for (var i = 0; i < m4xSubClasses.length; i++) {
	var subClass = m4xSubClasses[i];
	if (subClass.name) {
		m4x[subClass.name] = subClass;
	}
}

exports.m4x = m4x;
