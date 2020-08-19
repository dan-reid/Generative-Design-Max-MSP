var { Treemap } = require('gd.Treemap');
var { Mesh } = require('gd.Mesh');
var { Node } = require('gd.Node');
var { Attractor } = require('gd.Attractor');
var { Spring } = require('gd.Spring');
var { helpers } = require('gd.helpers');

function GenerativeDesign() {
	var methodObjects = [helpers];
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

var classes = [Treemap, Mesh, Node, Attractor, Spring];
for (var i = 0; i < classes.length; i++) {
	var theClass = classes[i];
	if (theClass.name) {
		GenerativeDesign[theClass.name] = theClass;
	}
}

exports.GenerativeDesign = GenerativeDesign;
