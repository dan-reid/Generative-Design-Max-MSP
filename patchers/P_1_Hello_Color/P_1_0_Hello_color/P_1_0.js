autowatch = 1;
include('gd.mouseinfo');

var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;
var width;
var height;

setup();

function setup() {
	width = 720;
	height = 720;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and display jit.mgraphics's output
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	m4 = new m4x();
	m4.color_mode('HSB', 360, 100, 100, 100);
}

function draw() {
	var bg_col = m4.color(mousey / 2, 100, 100, 100);
	background(bg_col.normalize().to_rgb());

	var fg_col = m4.color(360 - mousey / 2, 100, 100, 100);
	mg.set_source_rgb(fg_col.normalize().to_rgb());

	mg.rectangle(360 - (mousex + 1) / 2, 360 - (mousex + 1) / 2, mousex + 1, mousex + 1);
	mg.fill();

	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function background(c) {
	mg.set_source_rgba(c);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill bg_color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
