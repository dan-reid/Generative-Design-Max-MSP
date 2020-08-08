var { Treemap } = require('gd.Treemap');
var { Mesh } = require('gd.Mesh');
var { helpers } = require('gd.helpers');

function GenerativeDesign() {
	var gdMethodObjects = [helpers];
	for (var i = 0; i < gdMethodObjects.length; i++) {
		var methodObject = gdMethodObjects[i];
		for (var methodName in methodObject) {
			var method = methodObject[methodName];
			if (typeof method === 'function') {
				this[methodName] = method.bind(this);
			}
		}
	}
}

var gdSubClasses = [Treemap, Mesh];
for (var i = 0; i < gdSubClasses.length; i++) {
	var subClass = gdSubClasses[i];
	if (subClass.name) {
		GenerativeDesign[subClass.name] = subClass;
	}
}

exports.GenerativeDesign = GenerativeDesign;
