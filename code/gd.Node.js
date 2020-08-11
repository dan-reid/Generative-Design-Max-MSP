var { m4x } = require('m4x');
var { isInstanceOf } = require('util');

function Node(x, y, z) {
	// Node extends Vector
	m4x.Vector.call(this, x, y, z);

	this.m4 = new m4x();

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

	this.velocity = this.m4.create_vector();
	this.prev_velocity = this.m4.create_vector();
	this.max_velocity = 10;

	this.min_x = Number.MIN_VALUE;
	this.min_y = Number.MIN_VALUE;
	this.max_x = Number.MAX_VALUE;
	this.max_y = Number.MAX_VALUE;

	this.damping = 0.1;
	this.radius = 5; // Radius of impact
	this.ramp = 1; // Influences the shape of the functio
	this.strength = 1; // Strength: positive value attracts, negative value repels
}

Node.prototype = Object.create(m4x.Vector.prototype);

Node.prototype.update = function () {
	this.velocity.limit(this.max_velocity);

	this.x += this.velocity.x;
	this.y += this.velocity.y;

	if (this.x < this.min_x) {
		this.x = this.min_x - (this.x - this.min_x);
		this.velocity.x = -this.velocity.x;
	}
	if (this.x > this.max_x) {
		this.x = this.max_x - (this.x - this.max_x);
		this.velocity.x = -this.velocity.x;
	}

	if (this.y < this.min_y) {
		this.y = this.min_y - (this.y - this.min_y);
		this.velocity.y = -this.velocity.y;
	}
	if (this.y > this.max_y) {
		this.y = this.max_y - (this.y - this.max_y);
		this.velocity.y = -this.velocity.y;
	}

	this.velocity.mult(1 - this.damping);
};

Node.prototype.attract = function (node) {
	if (!isInstanceOf(node, 'Node')) {
		error('Node.prototype.attract expects an instance of the gd.Node class');
		return this;
	}

	var this_node_vector = m4.create_vector(this.x, this.y);
	var other_node_vector = m4.create_vector(node.x, node.y);
	var d = this_node_vector.dist(other_node_vector);

	if (d > 0 && d < this.radius) {
		var s = Math.pow(d / this.radius, 1 / this.ramp);
		var f = (s * 9 * this.strength * (1 / (s + 1) + (s - 3) / 4)) / d;
		var df = this_node_vector.sub(other_node_vector);
		df.mult(f);

		node.velocity.x += df.x;
		node.velocity.y += df.y;
	}
};

Node.prototype.attract_nodes = function (nodes_array) {
	for (var i = 0; i < nodes_array.length; i++) {
		var other_node = nodes_array[i];
		// Stop when empty
		if (other_node === undefined) break;
		// Continue from the top when node is itself
		if (other_node === this) continue;

		this.attract(other_node);
	}
};

Node.prototype.set_velocity = function (x, y) {
	if (x instanceof Vector || isInstanceOf(x, 'm4x.Vector')) {
		this.velocity.set(x);
		return this;
	}
	this.velocity.x = x;
	this.velocity.y = y;
	return this;
};

Node.prototype.set_max_velocity = function (max_vel) {
	this.max_velocity = max_vel;
	return this;
};

Node.prototype.set_boundary = function (min_x, min_y, max_x, max_y) {
	this.min_x = min_x;
	this.min_y = min_y;
	this.max_x = max_x;
	this.max_y = max_y;
	return this;
};

Node.prototype.set_damping = function (damping) {
	this.damping = damping;
	return this;
};

Node.prototype.set_radius = function (radius) {
	this.radius = radius;
	return this;
};

Node.prototype.set_strength = function (strength) {
	this.strength = strength;
	return this;
};

Node.prototype.constructor = Node;

exports.Node = Node;
