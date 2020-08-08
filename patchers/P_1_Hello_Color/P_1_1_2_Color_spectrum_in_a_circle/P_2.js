autowatch = 1;
var { m4x } = require('m4x');
var width = 500;
var height = 500;
var mg; // jit.mgraphics
var outputmatrix; // the matrix to store each frame of animation
var m4;

var segment_count;
var radius;
var saturation;
var brightness;

setup();

function setup() {
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	m4 = new m4x();
	segment_count = 360;
	radius = 220;
	maxhue = 360;
	saturation = width;
	brightness = height;
	m4.color_mode('HSB', 360, width, height, 100);
}

function draw() {
	background(1, 1, 1, 1);

	mg.set_line_width(1);
	var angle_step = 360 / segment_count;
	for (var angle = 0; angle < 360; angle += angle_step) {
		var x1 = width / 2 + Math.cos(m4.radians(angle)) * radius;
		var y1 = height / 2 + Math.sin(m4.radians(angle)) * radius;
		var x2 = width / 2 + Math.cos(m4.radians(angle + angle_step)) * radius;
		var y2 = height / 2 + Math.sin(m4.radians(angle + angle_step)) * radius;

		// The example is the book uses HSB (same as HSV)
		// As far as I can tell you can't change the color mode for mgraphics
		// So we work in HSB and then simply convert to RGB before drawing
		var hsb = m4.color(angle, saturation, brightness, 100);
		mg.set_source_rgba(hsb.normalize().to_rgb());
		triangle(x1, y1, x2, y2, width / 2, height / 2);
		mg.fill();
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function setSegmentCount(n) {
	segment_count = n;
}

function setSaturation(s) {
	saturation = s * width;
}

function setBrightness(b) {
	brightness = b * height;
}

/*
The color-wheel segements are arranged in the shape of a fan
the vertices are computed from the sin and cos values of the
corresponding angle. The Processing example uses the "TRIANGLE_FAN" mode of
beginShape() but since we don't have that function in mgraphics
a simpler method is to just draw a series of triangles.
*/

function triangle(x1, y1, x2, y2, x3, y3) {
	var vec1 = [x2 - x3, y2 - y3];
	var vec2 = [x1 - x2, y1 - y2];

	mg.move_to(x3, y3);
	mg.rel_line_to(vec1[0], vec1[1]);
	mg.rel_line_to(vec2[0], vec2[1]);
	mg.close_path();
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
