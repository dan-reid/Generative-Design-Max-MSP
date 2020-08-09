autowatch = 1;
var { m4x } = require('m4x');
var { GenerativeDesign } = require('GenerativeDesign');
var mg;
var m4;
var outputmatrix;
var width;
var height;
var mousex = 0;
var mousey = 0;
var mouse_is_pressed = false;

var x_count = 75;
var y_count = 75;
var grid_size = 500;
var node_count = x_count * y_count;

var nodes = [];
var attractor;
var damping = 0.02;

setup();

function setup() {
	width = 600;
	height = 600;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();
	attractor = new GenerativeDesign.Attractor(0, 0);

	nodes = init_grid();
}

function draw() {
	background(1, 1, 1, 0.1);

	attractor.x = mousex;
	attractor.y = mousey;

	for (var i = 0; i < node_count; i++) {
		if (mouse_is_pressed) {
			attractor.attract(nodes[i]);
		}

		nodes[i].update();

		mg.set_source_rgb(0, 0, 0);
		mg.rectangle(nodes[i].x, nodes[i].y, 1, 1);
		mg.fill();
	}

	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function set_damping(d) {
	damping = d;
}

function init_grid() {
	var i = 0;
	var the_nodes = [];
	for (var y = 0; y < y_count; y++) {
		for (var x = 0; x < x_count; x++) {
			var x_pos = x * (grid_size / (x_count - 1)) + (width - grid_size) / 2;
			var y_pos = y * (grid_size / (y_count - 1)) + (height - grid_size) / 2;
			the_nodes[i] = new GenerativeDesign.Node(x_pos, y_pos);
			the_nodes[i].set_boundary(0, 0, width, height);
			the_nodes[i].set_damping(damping); // try values from 0 - 1
			i++;
		}
	}
	return the_nodes;
}

function mousemoved(x, y, leftbutton, rightbutton) {
	mousex = x;
	mousey = y;
	mouse_is_pressed = leftbutton;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
