autowatch = 1;
var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;
var width;
var height;

var tilecount = 20;
var seed = 0;

var module_color_bg;
var module_color_fg;

var module_alpha_bg = 1;
var module_alpha_fg = 1;

var module_radius_bg = 30;
var module_radius_fg = 15;

var offsetx = 10;
var offsety = 30;

setup();

function setup() {
	width = 600;
	height = 600;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and display jit.mgraphics's output
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();

	module_color_bg = [0, 0, 0, module_alpha_bg];
	module_color_fg = [1, 1, 1, module_alpha_fg];
}

function draw() {
	background(1, 1, 1, 1);
	m4.randomseed(seed);

	for (var y = 0; y < tilecount; y++) {
		for (var x = 0; x < tilecount; x++) {
			var px = (width / tilecount) * x + module_radius_bg / 2;
			var py = (height / tilecount) * y + module_radius_bg / 2;

			var offx = m4.random(-1, 1) * offsetx;
			var offy = m4.random(-1, 1) * offsety;

			mg.set_source_rgba(module_color_bg);

			mg.ellipse(px + offx - module_radius_bg / 2, py + offy - module_radius_bg / 2, module_radius_bg, module_radius_bg);
			mg.fill();
		}
	}

	for (var y = 0; y < tilecount; y++) {
		for (var x = 0; x < tilecount; x++) {
			var px = (width / tilecount) * x + module_radius_bg / 2;
			var py = (height / tilecount) * y + module_radius_bg / 2;

			mg.set_source_rgba(module_color_fg);

			mg.ellipse(px - module_radius_fg / 2, py - module_radius_fg / 2, module_radius_fg, module_radius_fg);
			mg.fill();
		}
	}

	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function set_offsetx(x) {
	offsetx = x;
}

function set_offsety(y) {
	offsety = y;
}

function set_module_bg_color(r, g, b, a) {
	module_color_bg = [r, g, b, a];
}

function set_module_fg_color(r, g, b, a) {
	module_color_fg = [r, g, b, a];
}

function set_bg_radius(r) {
	module_radius_bg = r;
}

function set_fg_radius(r) {
	module_radius_fg = r;
}

function new_random_seed() {
	seed = Math.random() * 10000000;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
