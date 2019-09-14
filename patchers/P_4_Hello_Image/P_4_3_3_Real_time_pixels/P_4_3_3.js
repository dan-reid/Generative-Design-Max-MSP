autowatch = 1;
var mg;
var mgmatrix;
var pc;
var cam;

var width;
var height;

var x = width/2; // begin in the centre of the screen
var y = height/2;
var diffusion = 50; // area of squiggle
var pointCount = 1; // Num points in squiggle
var curvePointX = 0; // for setting the coords of the squiggle
var curvePointY = 0;
var speed = 10; // drawing speed

setup();

function setup() {
	width = 640;
	height = 480;
	mg = new JitterObject("jit.mgraphics", width, height);
	// the alpha channel is sliced off from the output of jit.grab
	// so we only need a 3 plane matrix
	mgmatrix = new JitterMatrix(3, "char", width, height);
	pc = new PClone();

	/*
	this is lets us access the matrix named "cam" located in the main patch
	in which the pixel values from our camera are stored.
	we are setting it's dimentions from the script.
	*/
	cam = new JitterMatrix("cam", 3, "char", width, height);
	background(1, 1, 1, 1);
}

function draw() {
	
	var col = [];

	for(var j = 0; j < speed; j++) {

		// grab the pixel value from the camera
		// based on the walker's current position
		col = cam.getcell(Math.floor(x),Math.floor(y));
		// the line width is decided by the brightness of the pixel
		// dark = big, bright = small
		var b = brightness(col)/20;
		b = pc.constrain(b, 1, 5);
		var lw = 6 - b;
		mg.set_line_width(lw);

		// set the line color to the current pixel's color
		mg.set_source_rgb(col[0]/255, col[1]/255, col[2]/255);

		// move the cursor to the current point and draw the squiggle
		mg.move_to(x, y);
		for(var i = 0; i < pointCount; i++) {
			var rx = pc.random(-diffusion, diffusion);
			curvePointX = pc.constrain(x+rx, 0, width-1);
			var ry = pc.random(-diffusion, diffusion);
			curvePointY = pc.constrain(y+ry, 0, height-1);
			mg.line_to(curvePointX, curvePointY);
		}
		mg.stroke();
		// set the previous curve point
		x = curvePointX;
		y = curvePointY;
	}
	mg.matrixcalc(mgmatrix, mgmatrix);
	outlet(0, "jit_matrix", mgmatrix.name);
}

function brightness(c) {
	return (0.299*c[0] + 0.7152*c[1] + 0.0722*c[2]);
}

// for changing params from the patch
function set_speed(s) {
	speed = s;
}

function set_point_count(n) {
	pointCount = n;
}

function set_diffusion(d) {
	diffusion = d;
}

function clear() {
	background(1, 1, 1, 1);
}

// sets the default state of [jit.mgraphics]
function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default drawing color = black
	mg.identity_matrix();
	mg.move_to(0, 0);
  mg.matrixcalc(mgmatrix, mgmatrix);
}