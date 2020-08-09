var { Vector } = require('m4x.Vector');
var { isInstanceOf } = require('util');

function Node(x, y, z) {
	// Node extends Vector
	Vector.call(this, x, y, z);

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

	this.velocity = new Vector();

	this.min_x = 5;
	this.min_y = 5;
	this.max_x = 100 - this.min_x;
	this.max_y = 100 - this.min_y;

	this.damping = 0.1;
}

Node.prototype.update = function () {
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

	this.velocity.x *= 1 - this.damping;
	this.velocity.y *= 1 - this.damping;
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

exports.Node = Node;
