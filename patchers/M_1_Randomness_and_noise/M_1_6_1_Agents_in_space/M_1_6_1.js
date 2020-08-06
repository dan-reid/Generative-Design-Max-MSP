autowatch = 1;
var { PClone } = require('PClone');
var sketch;
var pc;

var spacesize_x = 0.5;
var spacesize_y = 0.75;
var spacesize_z = 0.5;

var agentcount = 150;
var maxagents = 250;
var agents = [maxagents];
var agent_alpha = 0.298;
var max_ribbon_points = 150;
var min_ribbon_points = 10;
var noise_scale = 150;
var noise_strength = 20;
var line_width = 0.5;

var freeze = false;

setup();

function setup() {
	sketch = new JitterObject('jit.gl.sketch', 'M_1_6_1');
	sketch.blend_enable = 1;
	sketch.blend = 'alphablend';
	sketch.automatic = 0;

	pc = new PClone();

	for (var i = 0; i < maxagents; i++) {
		agents[i] = new Agent();
	}
}

function draw() {
	sketch.reset();
	for (var i = 0; i < agentcount; i++) {
		if (!freeze) agents[i].update();
		agents[i].set_alpha(agent_alpha);
		agents[i].draw();
	}
	sketch.draw();
}

function set_agent_count(v) {
	agentcount = pc.constrain(v, 0, maxagents);
}

function set_noise_scale(v) {
	noise_scale = v;
}

function set_noise_strength(v) {
	noise_strength = v;
}

function set_max_ribbon_points(v) {
	max_ribbon_points = pc.constrain(v, min_ribbon_points + 1, 100);
}

function set_line_width(v) {
	line_width = v;
}

function set_agent_alpha(v) {
	agent_alpha = v;
}

function freeze_positions(n) {
	freeze = n;
}

function Agent() {
	this.p = pc.create_vector(pc.random(-spacesize_x, spacesize_x), pc.random(-spacesize_y, spacesize_y), pc.random(-spacesize_z, spacesize_z));
	this.stepsize = pc.random(0.002, 0.05);
	this.angle_y = 0;
	this.angle_z = 0;
	this.alpha = 0.298;
	this.outside = false;
	this.col = [0, 0, 0, this.alpha];
	this.ribbon = new Ribbon3d(this.p, Math.floor(pc.random(min_ribbon_points, max_ribbon_points)));

	Agent.prototype.update = function () {
		// a range of -1 1 doesn't work well for the
		// perlin noise function, so we remap it.
		var offset_x = pc.map(this.p.x, -1, 1, 0, 1000);
		var offset_y = pc.map(this.p.y, -1, 1, 0, 1000);
		var offset_z = pc.map(this.p.z, -1, 1, 0, 1000);
		this.angle_y =
			pc.noise(offset_x / Math.max(1, noise_scale), offset_y / Math.max(1, noise_scale), offset_z / Math.max(1, noise_scale)) * noise_strength;

		// offset angle_z by another amount for variation
		this.angle_z =
			pc.noise(
				offset_x / Math.max(1, noise_scale) + 10000,
				offset_y / Math.max(1, noise_scale) + 10000,
				offset_z / Math.max(1, noise_scale) + 10000
			) * noise_strength;

		/*
		convert polar to cartesian coordinates
		stepsize is distance of the point to the last point
		angle_y is the angle for rotation around y-axis
		angle_z is the angle for rotation around z-axis
		*/
		this.p.x += Math.cos(this.angle_z) * Math.cos(this.angle_y) * this.stepsize;
		this.p.y += Math.sin(this.angle_z) * this.stepsize;
		this.p.z += Math.cos(this.angle_z) * Math.sin(this.angle_y) * this.stepsize;

		if (
			this.p.x < -spacesize_x ||
			this.p.x > spacesize_x ||
			this.p.y < -spacesize_y ||
			this.p.y > spacesize_y ||
			this.p.z < -spacesize_z ||
			this.p.z > spacesize_z
		) {
			this.set_random_position();
			this.outside = true;
		} // end if

		this.ribbon.update(this.p, this.outside);
		this.outside = false;
	}; // end update

	Agent.prototype.draw = function () {
		this.ribbon.draw_line_ribbon(this.col, line_width);
	};

	Agent.prototype.set_ribbon_points = function (n) {
		this.ribbon.set_point_count(n);
	};

	Agent.prototype.set_alpha = function (a) {
		this.alpha = a;
		this.col = [0, 0, 0, this.alpha];
	};

	Agent.prototype.set_random_position = function () {
		this.p.x = pc.random(-spacesize_x, spacesize_x);
		this.p.y = pc.random(-spacesize_y, spacesize_y);
		this.p.z = pc.random(-spacesize_z, spacesize_z);
	};
}

function Ribbon3d(p, n) {
	this.points = [];
	this.count = n;
	this.is_gap = [];

	for (var i = 0; i < this.count; i++) {
		this.points[i] = pc.create_vector(p.x, p.y, p.z);
		this.is_gap[i] = false;
	}

	Ribbon3d.prototype.update = function update(pos, g) {
		for (var i = this.count - 1; i > 0; i--) {
			this.points[i].set(this.points[i - 1]);
			this.is_gap[i] = this.is_gap[i - 1];
		}
		this.points[0].set(pos);
		this.is_gap[0] = g;
	};

	Ribbon3d.prototype.set_point_count = function set_point_count(n) {
		this.count = n;
	};

	// not working!
	Ribbon3d.prototype.draw_mesh_ribbon = function draw_mesh_ribbon(col, width) {
		sketch.glbegin('quad_strip');
		for (var i = 0; i < this.count - 1; i++) {
			if ((this.is_gap[i] = true)) {
				sketch.glvertex(this.points[i].x, this.points[i].y, this.points[i].z);
				sketch.glvertex(this.points[i].x, this.points[i].y, this.points[i].z);
				sketch.glend();
				sketch.glbegin('quad_strip');
			} else {
				var v1 = PClone.Vector.sub(this.points[i], this.points[i + 1]);
				var v2 = PClone.Vector.add(this.points[i + 1], this.points[i]);
				var v3 = v1.cross(v2);
				v2 = v1.cross(v3);
				v2.normalize();
				v2.mult(width);
				sketch.glvertex(this.points[i].x + v2.x, this.points[i].y + v2.y, this.points[i].z + v2.z);
				sketch.glvertex(this.points[i].x - v2.x, this.points[i].y - v2.y, this.points[i].z - v2.z);
			}
		}
		sketch.glend();
	};

	Ribbon3d.prototype.draw_line_ribbon = function draw_line_ribbon(col, width) {
		sketch.color = [col[0], col[1], col[2], col[3]];
		sketch.gllinewidth(width);
		for (var i = 0; i < this.count - 1; i++) {
			if (!this.is_gap[i] == true) {
				sketch.linesegment(this.points[i].x, this.points[i].y, this.points[i].z, this.points[i + 1].x, this.points[i + 1].y, this.points[i + 1].z);
			}
		}
	};
}
