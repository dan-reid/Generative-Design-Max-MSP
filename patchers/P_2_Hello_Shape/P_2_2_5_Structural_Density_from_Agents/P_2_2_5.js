autowatch = 1;
var { PClone } = require('m4x');
var mg;
var pc;
var outputmatrix;
var width;
var height;

var circles = [];

var min_radius = 3;
var max_radius = 50;

// for mouse interaction
var mouse_rect = 15;
var mousepressed = false;

var freeze = false;

var show_circles = true;
var show_lines = true;

setup();

function setup() {
	width = 500;
	height = 500;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	outputmatrix.adapt = 1;

	pc = new PClone();
}

function draw() {
	background(1, 1, 1, 1);

	// Choose a random or the current mouse position
	var new_x = pc.random(max_radius, width - max_radius);
	var new_y = pc.random(max_radius, height - max_radius);
	if (mousepressed) {
		new_x = pc.random(mouse_x - mouse_rect, mouse_x + mouse_rect);
		new_y = pc.random(mouse_y - mouse_rect, mouse_y + mouse_rect);
	}

	// Try to fit the largest possible circle at the current location without overlapping
	var intersection = false;
	for (var new_r = max_radius; new_r >= min_radius; new_r--) {
		for (var i = 0; i < circles.length; i++) {
			var d = pc.dist(new_x, new_y, circles[i].x, circles[i].y);
			intersection = d < circles[i].r + new_r;
			if (intersection) {
				break;
			}
		}
		if (!intersection) {
			circles.push(new Circle(new_x, new_y, new_r));
			break;
		}
	}

	for (var i = 0; i < circles.length; i++) {
		if (show_lines) {
			// Try to find an adjacent circle to the current one and draw a connection line between the two
			var closest_circle;
			for (var j = 0; j < circles.length; j++) {
				var d = pc.dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
				if (d <= circles[i].r + circles[j].r + 1) {
					closest_circle = circles[j];
					break;
				}
			}
			if (closest_circle) {
				var col = pc.color(102, 229, 102);
				mg.set_source_rgb(col.normalize());
				mg.move_to(circles[i].x, circles[i].y);
				mg.line_to(closest_circle.x, closest_circle.y);
				mg.stroke();
			}
		}

		// Draw the circle itself
		if (show_circles) circles[i].draw();
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function Circle(x, y, r) {
	this.x = x; // centre x
	this.y = y; // centre y
	this.r = r;

	Circle.prototype.draw = function () {
		mg.set_source_rgb(0, 0, 0);
		mg.ellipse(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
		mg.stroke();
	};
}

function showlines(v) {
	show_lines = v;
}

function showcircles(v) {
	show_circles = v;
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
