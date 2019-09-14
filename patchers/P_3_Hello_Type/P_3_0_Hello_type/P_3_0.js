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
 * space               : save png
 */

autowatch = 1;
var mg;// jit.mgraphics
var outputmatrix;
var bg; // background color
var width;
var height;
var letter; // the letter to draw
var font;
var fontsize;
var mousex = 0;
var mousey = 0;
var mousepressed = 0;

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

function mousedragged(x, y){
	mousex = x;
	mousey = y;
	with(mg) {
		select_font_face('Ariel');
		set_font_size((mousex-width/2)*5+1);
		var fe = font_extents(); // returns [fontascent, fontdescent, fontheight]
		var te = text_measure(letter); // returns [width, height]
		var t_x = width/2 - te[0]/2; // divide by letter width to centre the letter horizontally
		var t_y = mousey + fe[0]/2; // baseline = centre
		move_to(t_x, t_y);
		show_text(letter);
		fill();
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
	
}

function mousemoved(x, y) {
	background(1, 1, 1, 1);
	mousex = x;
	mousey = y;
	with(mg) {
		select_font_face('Ariel');
		set_font_size((mousex-width/2)*5+1);
		var fe = font_extents(); // returns [fontascent, fontdescent, fontheight]
		var te = text_measure(letter); // returns [width, height]
		var t_x = width/2 - te[0]/2; // divide by letter width to centre the letter horizontally
		var t_y = mousey + fe[0]/2; // centre the font fontascent to centre vertically
		move_to(t_x, t_y);
		show_text(letter);
		fill();
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function keypressed(k) {
	// 32 = spacebar, which is used for saving the image
	if(k !== 32) letter = String.fromCharCode(k);
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default drawing color = black
	mg.identity_matrix();
	mg.move_to(0, 0);
  	mg.matrixcalc(outputmatrix, outputmatrix);
}

