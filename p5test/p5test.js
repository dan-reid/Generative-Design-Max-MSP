autowatch = 1;
var mg;
var mgmatrix;
var mu;
var p5;
var width;
var height;

var xoff = 0;

setup();

function setup() {
	width = 640;
	height = 480;
	// jit.mgraphics
	mg = new JitterObject("jit.mgraphics", width, height);
	// the matrix to store and display jit.mgraphics's output
	mgmatrix = new JitterMatrix(4, "char", width, height);
	// have the matrix automatically adapt if we change the
	// dimentions from the patch
	mgmatrix.adapt = 1;

	p5 = new PClone();
	xoff = 0;
}

function draw() {
	background(1, 1, 1, 0.1);
	var n = p5.noise(xoff) * width;
	mg.set_line_width(4);
	mg.ellipse(n, height/2-50, 100, 100);
	mg.fill();

	xoff += 0.01;

	// this should always be last in the draw function
	mg.matrixcalc(mgmatrix, mgmatrix);
	outlet(0, "jit_matrix", mgmatrix.name);
}

function dim(w, h) {
	width = w;
	height = h;
	mg.dim = [width, height];
}

function println() {
	for(var i = 0; i < arguments.length; i++) {
		post(arguments[i]+"\n");
	}
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(mgmatrix, mgmatrix);
}
