autowatch = 1;

var mg; // jit.mgraphics
var outputmatrix;
var width;
var height;

var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST = 7;

var stepsize = 1;
var diameter = 1;
var direction;
var speed = 250; // number of steps per frame
var pos_x, pos_y;

setup();

function setup() {
	width = 500;
	height = 500;
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	pos_x = width / 2;
	pos_y = height / 2;
	background(1, 1, 1, 1);
}

function draw() {
	for (var i = 0; i < speed; i++) {
		direction = Math.floor(Math.random() * 8);

		if (direction == NORTH) {
			pos_y -= stepsize;
		} else if (direction == NORTHEAST) {
			pos_x += stepsize;
			pos_y -= stepsize;
		} else if (direction == EAST) {
			pos_x += stepsize;
		} else if (direction == SOUTHEAST) {
			pos_x += stepsize;
			pos_y += stepsize;
		} else if (direction == SOUTH) {
			pos_y += stepsize;
		} else if (direction == SOUTHWEST) {
			pos_x -= stepsize;
			pos_y += stepsize;
		} else if (direction == WEST) {
			pos_x -= stepsize;
		} else if (direction == NORTHWEST) {
			pos_x -= stepsize;
			pos_y -= stepsize;
		}

		if (pos_x > width) pos_x = 0;
		if (pos_x < 0) pos_x = width;
		if (pos_y > height) pos_y = 0;
		if (pos_y < 0) pos_y = height;

		mg.set_source_rgba(0, 0, 0, 1);
		mg.ellipse(pos_x + stepsize / 2, pos_y + stepsize / 2, diameter, diameter);
		mg.fill();
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function clear() {
	background(1, 1, 1, 1);
}

function setspeed(v) {
	speed = v;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
