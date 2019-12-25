/**
 * changing the size and the position of a letter
 *
 * MOUSE
 * position x          : size
 * position y          : position
 * drag                : draw
 *
 * KEYS
 * a-z                 : change letter
 */

autowatch = 1;
var { PClone } = require('PClone');
var mg;// jit.mgraphics
var outputmatrix;
var bg; // background color
var width;
var height;
var letter; // the letter to draw
var font;
var fontsize;

var mouse_x = 0;
var mouse_y = 0;
var mousedown = 0;

var textwidth = 0;
var textheight = 0;
var fontascent = 0;
var fontdescent = 0;
var fontheight = 0;

setup();

function setup() {
	width = 500;
	height = 500;
	mg = new JitterObject("jit.mgraphics", width, height);
	outputmatrix = new JitterMatrix(4, "char", width, height);
	letter = 'O';
	fontsize = 12;
}

function draw() {

	if(!mousedown) background(1, 1, 1, 1);
		
	mg.select_font_face('Ariel');
	mg.set_font_size((mouse_x - width / 2) * 5 + 1);
	var fe = mg.font_extents(); // returns [fontascent, fontdescent, fontheight]
	var te = mg.text_measure(letter); // returns [width, height]
	var t_x = width / 2 - te[0] / 2; // divide by letter width to centre the letter horizontally
	var t_y = mouse_y + fe[0] / 2; // baseline = centre
	mg.move_to(t_x, t_y);
	mg.show_text(letter);
	mg.fill();

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function mousemoved(x, y, leftclick, rightclick) {
	mouse_x = x;
	mouse_y = y;
	mousedown = leftclick;
}

function keypressed(key) {
	if (key !== 'SPACE') letter = key;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default drawing color = black
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}

