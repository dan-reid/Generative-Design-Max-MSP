autowatch = 1;
var { PClone } = require('PClone');
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
var posX, posY;

setup();

function setup() {
	width = 500;
	height = 500;
	mg = new JitterObject("jit.mgraphics", width, height);
	outputmatrix = new JitterMatrix(4, "char", width, height);
	posX = width/2;
	posY = height/2;
	background(1, 1, 1, 1);
}

function draw() {
	for(var i = 0; i < speed; i++) {
		direction = Math.floor(Math.random()*8);

		if(direction == NORTH) {
			posY -= stepsize;
		}
		else if (direction == NORTHEAST) {
			posX += stepsize;
			posY -= stepsize;
		}
		else if (direction == EAST) {
			posX += stepsize;
		}
		else if (direction == SOUTHEAST) {
			posX += stepsize;
			posY += stepsize;
		}
		else if (direction == SOUTH) {
			posY += stepsize;
		}
		else if (direction == SOUTHWEST) {
			posX -= stepsize;
			posY += stepsize;
		}
		else if (direction == WEST) {
			posX -= stepsize;
		}
		else if (direction == NORTHWEST) {
			posX -= stepsize;
			posY -= stepsize;
		}

		if (posX > width) posX = 0;
		if (posX < 0) posX = width;
		if (posY > height) posY = 0;
		if (posY < 0) posY = height;

	  mg.set_source_rgba(0, 0, 0, 1);
		mg.ellipse(posX+stepsize/2, posY+stepsize/2, diameter, diameter);
		mg.fill();
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
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
