autowatch = 1;
var { m4x } = require('m4x');
var width = 1280;
var height = 800;

var mg; // jit.mgraphics
var outputmatrix;
var m4;

var overlay_aplha = 0.1;
var agent_alpha = 1;
var agent_col = [0, 0, 0, agent_alpha];
var linewidth = 0.2;
var maxagents = 5000;
var agentcount = 2000;
var agents = [maxagents];
var noise_scale = 100;
var noise_strength = 10;

setup();

function setup() {
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	m4 = new m4x();

	for (var i = 0; i < maxagents; i++) {
		agents[i] = new Agent();
	}
}

function draw() {
	background(1, 1, 1, overlay_aplha);

	for (var i = 0; i < agentcount; i++) {
		agents[i].set_alpha(agent_alpha);
		agents[i].update1();
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}

function set_agent_count(v) {
	agentcount = m4.constrain(v, 0, maxagents);
}

function set_noise_scale(v) {
	noise_scale = v;
}

function set_noise_strength(v) {
	noise_strength = v;
}

function set_noiseZ_range(v) {
	for (var i = 0; i < agentcount; i++) {
		agents[i].set_noiseZ_range(v);
	}
}

function set_overlay_alpha(a) {
	overlay_aplha = m4.constrain(a, 0, 1);
}

function set_agent_alpha(a) {
	agent_alpha = m4.constrain(a, 0, 1);
}

function Agent() {
	this.p = m4.create_vector(m4.random(0, width), m4.random(0, height));
	this.p_old = m4.create_vector(this.p.x, this.p.y);
	this.noiseZVelocity = 0.01;
	this.stepsize = m4.random(1, 5);
	this.angle = 0;
	this.alpha = 1;
	this.noiseZ = m4.random(0.3);

	Agent.prototype.set_alpha = function (a) {
		this.alpha = a;
	};

	Agent.prototype.update1 = function () {
		this.angle = m4.noise(this.p.x / noise_scale, this.p.y / noise_scale, this.noiseZ) * noise_strength;

		this.p.x += Math.cos(this.angle) * this.stepsize;
		this.p.y += Math.sin(this.angle) * this.stepsize;

		if (this.p.x < -10) this.p.x = this.p_old.x = width + 10;
		if (this.p.x > width + 10) this.p.x = this.p_old.x = -10;
		if (this.p.y < -10) this.p.y = this.p_old.y = height + 10;
		if (this.p.y > height + 10) this.p.y = this.p_old.y = -10;

		mg.set_source_rgba(agent_col[0], agent_col[1], agent_col[2], this.alpha);
		mg.set_line_width(linewidth * this.stepsize);
		mg.move_to(this.p_old.x, this.p_old.y);
		mg.line_to(this.p.x, this.p.y);
		mg.stroke();

		this.p_old.x = this.p.x;
		this.p_old.y = this.p.y;
		this.noiseZ += this.noiseZVelocity;
	};

	Agent.prototype.set_noiseZ_range = function (r) {
		this.noiseZ = m4.random(r);
	};

	// Agent.prototype.update2 = function() {
	// 	this.p_old.x = this.p.x;
	// 	this.p_old.y = this.p.y;
	// 	this.angle = noise.getcell(Math.abs(Math.floor(this.p.x % noise.dim[0])/), Math.abs(Math.floor(this.p.y % noise.dim[1]))) * 24;
	// 	this.angle *= maxpoints;
	//
	// 	// this.p.x += Math.cos(this.angle) * this.stepsize;
	// 	// this.p.y += Math.sin(this.angle) * this.stepsize;
	// 	this.p.x += cos[Math.floor(this.angle)];
	// 	this.p.y += sin[Math.floor(this.angle)];
	//
	// 	if (this.p.x < 0) this.p.x = this.p_old.x = width;
	// 	if (this.p.x > width) this.p.x = this.p_old.x = 0;
	// 	if (this.p.y < 0) this.p.y = this.p_old.y = height;
	// 	if (this.p.y > height) this.p.y = this.p_old.y = 0;
	//
	// 	with(mg) {
	// 		set_line_width(linewidth*this.stepsize);
	// 		move_to(this.p_old.x, this.p_old.y);
	// 		line_to(this.p.x, this.p.y);
	// 		stroke();
	// 	}
	//
	//
	// 	this.noiseZ += this.noiseZVelocity;
	// }
}
