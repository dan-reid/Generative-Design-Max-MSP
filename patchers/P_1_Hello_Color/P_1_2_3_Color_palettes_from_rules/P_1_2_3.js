autowatch = 1;
var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;
var width;
var height;

var color_count = 20;
var hue_values = [];
var saturation_values = [];
var brightness_values = [];
var seed = 0;
var base_hue = 198;
var base_saturation = 100;
var base_brightness = 100;

setup();

function setup() {
	width = 640;
	height = 480;
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	outputmatrix.adapt = 1;

	m4 = new m4x();
	m4.color_mode('HSB', 360, 100, 100, 100);
}

function set_base_hue(v) {
	base_hue = v;
}

function set_base_saturation(v) {
	base_saturation = v;
}

function set_base_brightness(v) {
	base_brightness = v;
}

function set_color_count(v) {
	color_count = m4.constrain(v, 2, 100);
}

function new_pallette() {
	background(1, 1, 1, 1);
	seed = m4.random(100000);
	m4.random_seed(seed);

	// ----- Colors -------
	for (var i = 0; i < color_count; i++) {
		if (i % 2 == 0) {
			hue_values[i] = m4.random();
			saturation_values[i] = base_saturation;
			brightness_values[i] = m4.random(0.2, base_brightness);
		} else {
			hue_values[i] = base_hue;
			saturation_values[i] = m4.random(0.2, base_saturation);
			brightness_values[i] = base_brightness;
		}
	}

	// ----- Area tiling --------
	// count tiles
	var counter = 0;
	// row count and row height
	var row_count = Math.floor(m4.random(5, 30));
	var row_height = height / row_count;

	// seperate each line is parts
	for (var i = row_count; i >= 0; i--) {
		// the number of fragments
		var part_count = i + 1;
		var parts = [];
		for (var ii = 0; ii < part_count; ii++) {
			// chance a row is divided in fragments
			if (m4.random() < 0.075) {
				var fragments = Math.floor(m4.random(2, 20));
				part_count += fragments;
				for (var iii = 0; iii < fragments; iii++) {
					parts.push(m4.random(2));
				}
			} else {
				parts.push(m4.random(2, 20));
			}
		}

		// add all subparts
		var sum_parts_total = 0;
		for (var ii = 0; ii < part_count; ii++) {
			sum_parts_total += parts[ii];
		}

		// draw rects
		var sum_parts_now = 0;
		for (var ii = 0; ii < parts.length; ii++) {
			sum_parts_now += parts[ii];

			var x = m4.map(sum_parts_now, 0, sum_parts_total, 0, width);
			var y = row_height * i;
			var w = -m4.map(parts[ii], 0, sum_parts_total, 0, width);
			var h = row_height;

			var index = counter % color_count;
			var col = m4.color(hue_values[index], saturation_values[index], brightness_values[index]);
			// var col = m4.hsb_to_rgb([hue_values[index], saturation_values[index], brightness_values[index]]);
			mg.set_source_rgb(col);
			mg.rectangle(x, y, w, h);
			mg.fill();
			counter++;
		}
	}
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
