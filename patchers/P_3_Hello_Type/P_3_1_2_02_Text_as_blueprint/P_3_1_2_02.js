autowatch = 1;
include('m4x.mouseinfo');

var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;

var width;
var height;

var datapath;

var centrex;
var centrey;
var offsetx;
var offsety;
var zoom;

var on_click_x = 0;
var on_click_y = 0;

// used to make cursor blink
var framecount = 0;

var font;
var text;

var palette = [
	[253, 195, 0],
	[0, 0, 0],
	[0, 158, 224],
	[99, 33, 129],
	[121, 156, 19],
	[226, 0, 26],
	[224, 134, 178],
];

var act_color_index = 0;

var seed = Math.random() * 100000;

setup();

function setup() {
	datapath = getpath();
	width = 1000;
	height = 1000;
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	m4 = new m4x();

	centrex = width / 2;
	centrey = height / 2;
	offsetx = 0;
	offsety = 0;
	zoom = 1.5;

	font = 'Andale Mono';
	text =
		"But being quiet and meditating on sound is something completely different and will be discovered very soon by a lot of people who feel that the visual world doesn't reach their soul anymore.";
}

function draw() {
	background(1, 1, 1, 1);

	if (mousedown) {
		centrex = mousex - offsetx;
		centrey = mousey - offsety;
	}

	m4.random_seed(seed);

	mg.set_line_width(1);
	mg.select_font_face(font);
	mg.set_font_size(25);
	mg.translate(centrex, centrey);
	mg.scale(zoom, zoom);

	var col = m4.color(palette[act_color_index][0], palette[act_color_index][1], palette[act_color_index][2]);
	mg.set_source_rgba(col);

	mg.save();
	act_color_index = 0;
	mg.rectangle(0, -25, 10, 35);

	for (var i = 0; i < text.length; i++) {
		mg.set_font_size(25);
		var letter = text.charAt(i);
		var tm = mg.text_measure(letter);
		var letterwidth = tm[0];

		switch (letter) {
			case ' ': //space
				var dir = Math.floor(m4.random(2));
				if (dir === 0) {
					mg.move_to(0, -15);
					mg.svg_render(datapath + 'space.svg');
					mg.translate(1.9, 0);
					mg.rotate(Math.PI / 4);
				} else {
					mg.move_to(0, -15);
					mg.svg_render(datapath + 'space2.svg');
					mg.translate(13, -5);
					mg.rotate(-Math.PI / 4);
				}
				break;

			case ',':
				mg.move_to(0, -30);
				mg.svg_render(datapath + 'comma.svg');
				mg.translate(33, 15);
				mg.rotate(Math.PI / 4);
				break;

			case '.':
				mg.move_to(0, -30);
				mg.svg_render(datapath + 'period.svg');
				mg.translate(56, -56);
				mg.rotate(-Math.PI / 2);
				break;

			case '!':
				mg.move_to(0, -30);
				mg.svg_render(datapath + 'exclamationmark.svg');
				mg.translate(43, -18);
				mg.rotate(-Math.PI / 4);
				break;

			case '?':
				mg.svg_render(datapath + 'questionmark.svg');
				mg.translate(43, -18);
				mg.rotate(-Math.PI / 4);
				break;

			case '\n': // return
				mg.rectangle(0, -25, 10, 35);
				mg.fill();
				mg.restore();

				mg.save();
				mg.translate(m4.random(-300, 300), m4.random(-300, 300));
				mg.rotate(Math.floor(m4.random(8)) * (Math.PI / 4));
				act_color_index = (act_color_index + 1) % palette.length;
				var col = m4.color(palette[act_color_index][0], palette[act_color_index][1], palette[act_color_index][2]);
				mg.set_source_rgb(col);
				mg.rectangle(0, -25, 10, 35);
				mg.fill();
				break;

			case 'o': // Station big
				mg.rectangle(0, -15, letterwidth + 1, 15);
				mg.fill();

				mg.save();
				mg.set_source_rgb(0, 0, 0);
				var station = text.substring(i - 10, i - 1);
				station = station.toLowerCase();
				station = station.replace(/\s+/g, '');
				station = station.substring(0, 1).toUpperCase() + station.substring(1, station.length - 1);
				mg.move_to(-10, 40);
				mg.show_text(station);
				mg.stroke();

				var icon_diameter_1 = 33;
				var icon_radius_1 = icon_diameter_1 / 2;
				mg.ellipse(-5 - icon_radius_1, -7 - icon_radius_1, icon_diameter_1, icon_diameter_1);
				mg.fill();

				var icon_diameter_2 = 25;
				var icon_radius_2 = icon_diameter_2 / 2;
				mg.set_source_rgb(1, 1, 1);
				mg.ellipse(-5 - icon_radius_2, -7 - icon_radius_2, icon_diameter_2, icon_diameter_2);
				mg.fill();

				mg.restore();
				mg.translate(letterwidth, 0);
				break;

			case 'a': // Station small left
				mg.rectangle(0, 0 - 15, letterwidth + 1, 25);
				mg.rectangle(0, 0 - 15, letterwidth + 1, 15);
				mg.fill();

				mg.translate(letterwidth, 0);
				break;

			case 'u': // Station small right
				mg.rectangle(0, 0 - 25, letterwidth + 1, 25);
				mg.rectangle(0, 0 - 15, letterwidth + 1, 15);
				mg.fill();

				mg.translate(letterwidth, 0);
				break;

			case ':':
				mg.move_to(0, -60, 30, 30);
				mg.svg_render(datapath + 'icon1.svg');
				break;

			case '+':
				mg.move_to(0, -60, 30, 30);
				mg.svg_render(datapath + 'icon2.svg');
				break;

			case '-':
				mg.move_to(0, -60, 30, 30);
				mg.svg_render(datapath + 'icon3.svg');
				break;

			case 'x':
				mg.move_to(0, -60, 30, 30);
				mg.svg_render(datapath + 'icon4.svg');
				break;

			case 'z':
				mg.move_to(0, -60, 30, 30);
				mg.svg_render(datapath + 'icon5.svg');
				break;

			default:
				// all others
				mg.rectangle(0, -15, letterwidth + 1, 15);
				mg.fill();
				mg.translate(letterwidth, 0);
		}
		framecount++;
	}

	if ((framecount / 6) % 8 === 0) {
		mg.set_line_width(10);
		mg.rectangle(0, 0, 15, 2);
		mg.stroke();
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function load_strings(f) {
	var strings = [];
	var tf = new File(f);
	tf.open();
	var i = 0;
	while (tf.isopen && tf.position < tf.eof) {
		strings[i] = tf.readline();
		i++;
	}
	tf.close();
	return strings;
}

function keypressed(key, caps, shift) {
	switch (key) {
		case 'BACKSPACE':
			text = text.substring(0, Math.max(0, text.length - 1));
			break;
		case 'RETURN':
			text += '\n';
			break;
		case 'SPACE':
			text += ' ';
			break;
		default:
			text += key;
	}
}

function mousepressed(x, y) {
	on_click_x = x;
	on_click_y = y;
	offsetx = on_click_x - centrex;
	offsety = on_click_y - centrey;
}

function change_font(f) {
	font = f;
}

function set_zoom(z) {
	zoom = z;
}

function getpath() {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat';
	p = p.replace(n, 'data/');
	return p;
}

function set_new_text(t) {
	text = t;
}

function new_random_seed() {
	seed = Math.random() * 99999;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 255);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
