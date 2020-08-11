var { m4x } = require('m4x');
var { isInstanceOf } = require('util');

function Spring(from_node, to_node, length, stiffness, damping) {
	if (!isInstanceOf(from_node, 'Node') || !isInstanceOf(to_node, 'Node')) {
		error('Spring expects the first two arguments to be an instance of the gd.Node class\n');
		return this;
	}

	this.m4 = new m4x();

	this.from_node = from_node;
	this.to_node = to_node;

	this.length = length || 100;
	this.stiffness = stiffness || 0.6;
	this.damping = damping || 0.9;
}

// ------ apply forces on spring and attached nodes ------
Spring.prototype.update = function () {
	// calculate the target position
	// target = normalize(to - from) * length + from

	var to_node_vector = this.m4.create_vector(this.to_node.x, this.to_node.y);
	var from_node_vector = this.m4.create_vector(this.from_node.x, this.from_node.y);

	var diff = m4x.Vector.sub(to_node_vector, from_node_vector);

	diff.normalize();
	diff.mult(this.length);
	var target = m4x.Vector.add(from_node_vector, diff);

	var force = m4x.Vector.sub(target, to_node_vector);
	force.mult(0.5);
	force.mult(this.stiffness);
	force.mult(1 - this.damping);

	this.to_node.velocity.add(force);
	var inv = m4x.Vector.mult(force, -1);
	this.from_node.velocity.add(inv);
};

Spring.prototype.set_length = function (length) {
	this.length = length;
};

Spring.prototype.set_stiffness = function (stiffness) {
	this.stiffness = stiffness;
};

Spring.prototype.set_damping = function (damping) {
	this.damping = damping;
};

exports.Spring = Spring;
