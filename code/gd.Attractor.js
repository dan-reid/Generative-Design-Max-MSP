var { isInstanceOf } = require('util');
var { calculation } = require('m4x.calculation');

function Attractor(x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.radius = 200;
}

Attractor.prototype.attract = function (node) {
	if (!isInstanceOf(node, 'Node')) {
		error('Attractor.prototype.attract expects an instance of the gd.Node class');
	}

	var dx = this.x - node.x;
	var dy = this.y - node.y;
	var d = calculation.mag(dx, dy);

	if (d > 0 && d < this.radius) {
		var s = d / this.radius;
		var f = 1 / Math.pow(s, 0.5) - 1;
		f /= this.radius;

		node.velocity.x += dx * f;
		node.velocity.y += dy * f;
	}
};

exports.Attractor = Attractor;
