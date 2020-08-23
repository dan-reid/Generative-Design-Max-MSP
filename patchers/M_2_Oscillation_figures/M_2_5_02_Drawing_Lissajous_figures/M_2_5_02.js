autowatch = 1;
outlets = 2;
var { m4x } = require('m4x');
var mg;
var outputmatrix;
var m4;
var width;
var height;

var pointcount = 1500;
var pointindex = 0;
var lissajous_points = [];
var freqX = 13;
var freqY = 11;
var phi = 97;

var mod_freqX = 0;
var mod_freqY = 0;

var mod_freq2X = 11;
var mod_freq2Y = 17;
var mod_freq2_strength = 0;

var randomoffset = 2;

var line_weight = 1;

var connection_radius = 110;
var min_hue_value = 0;
var max_hue_value = 100;
var saturation_value = 80;
var brightness_value = 0;
var line_alpha = 20;

var connect_all_points = true;
var invert_background = false;
var invert_hue = false;

var finished = false;

setup();

function setup() {
	width = 1024;
	height = 1024;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and display jit.mgraphics's output
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();
	m4.color_mode('HSB', 360, 100, 100, 100);
	calculate_lissajous_points();

	background(1, 1, 1, 1);
	if (invert_background) background(0, 0, 0, 1);
}

function draw() {
	if (!finished) {
		if (!connect_all_points) {
			for (var i = 0; i < pointcount - 1; i++) {
				drawline(lissajous_points[i], lissajous_points[i + 1]);
			}
		} else {
			var drawendtime = millis() + 10;
			for (var i1 = pointindex; i1 < pointcount && millis() < drawendtime; i1++) {
				for (var i2 = 0; i2 < i1; i2++) {
					drawline(lissajous_points[i1], lissajous_points[i2]);
				}
				pointindex = i1;
			}
			outlet(1, lissajous_points[i1].x, lissajous_points[i2].y);
		}
		if (pointindex >= pointcount - 1) finished = true;
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function calculate_lissajous_points() {
	m4.random_seed(0);

	for (var i = 0; i <= pointcount; i++) {
		var angle = m4.map(i, 0, pointcount, 0, Math.PI * 2);
		var fmx = Math.sin(angle * mod_freq2X) * mod_freq2_strength + 1;
		var fmy = Math.sin(angle * mod_freq2Y) * mod_freq2_strength + 1;

		var x = Math.sin(angle * freqX * fmx + m4.radians(phi)) * Math.cos(angle * mod_freqX);
		var y = Math.sin(angle * freqY * fmy) * Math.cos(angle * mod_freqY);

		var rx = m4.random(-randomoffset, randomoffset);
		var ry = m4.random(-randomoffset, randomoffset);

		x = x * (width / 2 - 30 - randomoffset) + width / 2 + rx;
		y = y * (height / 2 - 30 - randomoffset) + height / 2 + ry;

		lissajous_points[i] = m4.create_vector(x, y);
	}
}

function drawline(vector1, vector2) {
	var distance = m4x.Vector.dist(vector1, vector2);
	var angle = Math.pow(1 / (distance / connection_radius + 1), 6);

	if (distance <= connection_radius) {
		var hue = m4.lerp(min_hue_value, max_hue_value, invert_hue ? 1 - angle : angle) % 360;
		var brightness = invert_background ? 100 - brightness_value : brightness_value;
		var alpha = angle * line_alpha + (pointindex % 2) * 2;
		var col = m4.color(hue, saturation_value, brightness, alpha);

		mg.set_source_rgba(col);
		mg.set_line_width(line_weight);
		mg.move_to(vector1.x, vector1.y);
		mg.line_to(vector2.x, vector2.y);
		mg.stroke();
	}
}

function set_freq_params(fx, fy, p, mfx, mfy, mf2x, mf2y, mf2s) {
	freqX = fx;
	freqY = fy;
	phi = p;
	mod_freqX = mfx;
	mod_freqY = mfy;
	mod_freq2X = mf2x;
	mod_freq2Y = mf2y;
	mod_freq2_strength = mf2s;
	reset();
}

function set_style_params(pc, cr, minh, maxh, sat, bri, alp, cp, invb, invh) {
	pointcount = pc;
	connection_radius = cr;
	min_hue_value = minh;
	max_hue_value = maxh;
	saturation_value = sat;
	brightness_value = bri;
	line_alpha = alp;
	connect_all_points = cp;
	invert_background = invb;
	invert_hue = invh;
	reset();
}

function reset() {
	background(1, 1, 1, 1);
	if (invert_background) background(0, 0, 0, 1);
	pointindex = 0;
	calculate_lissajous_points();
	finished = false;
}

function millis() {
	var ms = new Date().getTime();
	return ms;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
