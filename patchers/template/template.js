autowatch = 1;

// include mousex & mousey variables
include('m4x.mouseinfo');

var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;

var width = 640;
var height = 480;

setup();

function setup() {
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();
	m4.color_mode('HSB', 360, 100, 100);
}

function draw() {
	background(1, 1, 1, 1);

	var col = m4.color(180, 100, 100);

	mg.set_line_width(4);
	mg.set_source_rgba(col);
	mg.ellipse(mousex - 50, mousey - 50, 100, 100);

	if (mousedown) {
		mg.fill();
	} else {
		mg.stroke();
	}

	// this should always be last in the draw function
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
