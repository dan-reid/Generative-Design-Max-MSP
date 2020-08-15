autowatch = 1;
var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;
var width;
var height;

// these values are updated by the 3rd & 4th outlets of gd.mouseinfo in the main patch
var mousex = 0;
var mousey = 0;

setup();

function setup() {
	width = 640;
	height = 480;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	// have the matrix automatically adapt if we change the
	// dimentions from the patch
	outputmatrix.adapt = 1;

	// Contains some common math, color functions and classes
	// from the p5js library:
	// dist(), map(), constrain(), radians(), degrees(), lerp()
	// normalize(), hsba_to_rgba()
	// random(), noise(), and Vector();
	m4 = new m4x();
}

function draw() {
	background(1, 1, 1, 1);

	mg.set_line_width(4);
	mg.ellipse(mousex - 50, mousey - 50, 100, 100);
	mg.stroke();

	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function dim(w, h) {
	width = w;
	height = h;
	mg.dim = [width, height];
}

function println() {
	for (var i = 0; i < arguments.length; i++) {
		post(arguments[i] + '\n');
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
