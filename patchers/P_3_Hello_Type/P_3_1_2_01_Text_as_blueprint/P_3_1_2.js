autowatch = 1;
include('gd.mouseinfo');

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
	zoom = 0.75;

	font = 'Andale Mono';
	text = 'In fifteen seconds, the difference between composition and improvisation is that\n';
	text += 'in composition you have all the time you want to think about what you want to say in fifteen seconds,\n\n';
	text += 'while in improvisation you have only fifteen seconds.\n\n';
	text += '- Steve Lacy';
}

function draw() {
	background(1, 1, 1, 1);

	m4.random_seed(seed);

	if (mousedown) {
		centrex = mousex - offsetx;
		centrey = mousey - offsety;
	}

	with (mg) {
		select_font_face(font);
		set_font_size(25);
		translate(centrex, centrey);
		scale(zoom, zoom);

		for (var i = 0; i < text.length; i++) {
			set_font_size(25);
			var letter = text.charAt(i);
			var tm = text_measure(letter);
			var letterwidth = tm[0];

			switch (letter) {
				case ' ': //space
					var dir = Math.floor(m4.random(2));
					if (dir == 0) {
						svg_render(datapath + 'space.svg');
						translate(1.9, 0);
						rotate(Math.PI / 4);
					}
					if (dir == 1) {
						svg_render(datapath + 'space2.svg');
						translate(13, -5);
						rotate(-Math.PI / 4);
					}
					break;

				case ',':
					mg.svg_render(datapath + 'comma.svg');
					translate(34, 15);
					rotate(Math.PI / 4);
					break;

				case '.':
					mg.svg_render(datapath + 'period.svg');
					translate(56, -54);
					rotate(-Math.PI / 4);
					break;

				case '!':
					mg.svg_render(datapath + 'exclamationmark.svg');
					translate(42, 17.4);
					rotate(Math.PI / 4);
					break;

				case '?':
					mg.svg_render(datapath + 'questionmark.svg');
					translate(42, -18);
					rotate(-Math.PI / 4);
					break;

				case '\n': // return
					mg.svg_render(datapath + 'return.svg');
					translate(0, 10);
					rotate(Math.PI);
					break;

				default:
					// all others
					set_source_rgb(0, 0, 0);
					move_to(0, 0);
					show_text(letter);
					translate(letterwidth, 0);
			}
		}
		framecount++;
		set_line_width(10);
		if ((framecount / 6) % 4 == 0) rectangle(0, 0, 15, 2);
		stroke();
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
