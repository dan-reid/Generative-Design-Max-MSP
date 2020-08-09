autowatch = 1;
var { m4x } = require('m4x');
var { GenerativeDesign } = require('GenerativeDesign');
var mg;
var m4;
var outputmatrix;
var width;
var height;

var node_count = 100;
var nodes = [];

setup();

function setup() {
	width = 600;
	height = 600;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();

	for (var i = 0; i < node_count; i++) {
		nodes[i] = new GenerativeDesign.Node(m4.random(width), m4.random(height), width, height);
		nodes[i].velocity.x = m4.random(-3, 3);
		nodes[i].velocity.y = m4.random(-3, 3);
		nodes[i].set_boundary(5, 5, width - 5, height - 5);
		nodes[i].set_damping(0.01);
	}
}

function draw() {
	background(1, 1, 1, 0.1);

	for (var i = 0; i < node_count; i++) {
		nodes[i].update();

		mg.set_source_rgb(0, 0, 0);
		mg.ellipse(nodes[i].x - 5, nodes[i].y - 5, 10, 10);
		mg.fill();
	}

	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function bang() {
	for (var i = 0; i < node_count; i++) {
		if (nodes[i]) {
			nodes[i].velocity.x = m4.random(-5, 5);
			nodes[i].velocity.y = m4.random(-5, 5);
		}
	}
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
