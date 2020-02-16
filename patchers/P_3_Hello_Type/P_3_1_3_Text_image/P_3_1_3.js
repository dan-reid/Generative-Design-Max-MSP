autowatch = 1;
var { PClone } = require('PClone');
var mg; // jit.mgraphics
var outputmatrix;
var pc;
var width;
var height;
var mousex = 0, mousey = 0, mousepressed = 0;
var font = 'Ariel';
var joined_text = '';
var char_set = [];
var tracking = 30;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.;:!? ";
var counters = [];
var posx = 90, posy = 250;
var drawalpha = true, drawlines = true;
var drawellipses = true, drawtext = true;
var mx = 0;
var my = 0;

var seed = 0;


setup();

function setup() {
	width = 1400;
	height = 800;
	mg = new JitterObject("jit.mgraphics", width, height);
	outputmatrix = new JitterMatrix(4, "char", width, height);
	pc = new PClone();
	joined_text = '';
	var f = new File("cage.txt");
	f.open();
	while(f.isopen && f.position < f.eof) {
		joined_text += f.readline() + ' ';
	}
	f.close();

	char_set = get_unique_chars();
	for(var i = 0; i < char_set.length; i++) counters[i] = 0;
	count_characters();
}

function draw() {
	background(1, 1, 1, 1);

	with(mg) {
		select_font_face(font);
		set_font_size(35);
		posx = 90;
		posy = 250;
		pc.randomseed(seed);

		for(var i = 0; i < joined_text.length; i++) {
			var char_uppercase = joined_text.charAt(i).toUpperCase();
			var index = char_set.indexOf(char_uppercase);
			if(index < 0) continue;

			var char_alpha = 255;
			if (drawalpha) char_alpha = counters[index]*10;

			var charsize = counters[index] * my * 7;

			var line_length = charsize;
			var line_angle = pc.random(-Math.PI, Math.PI) * mx - Math.PI/2;
			var new_posx = line_length * Math.cos(line_angle);
			var new_posy = line_length * Math.sin(line_angle);
			translate(posx, posy);
			set_source_rgba(139/255, 39/255, 221/255, char_alpha/255);
			if (drawlines) {
				move_to(0, 0);
				line_to(new_posx, new_posy);
				stroke();
			}
			set_source_rgba(212/255, 175/255, 55/255, char_alpha/255);
			if (drawellipses) {
				ellipse(0, 0, charsize/10, charsize/10);
				fill();
			}
			if (drawtext) {
				set_source_rgba(0, 0, 0, char_alpha/255);
				move_to(new_posx, new_posy);
				text_path(joined_text.charAt(i))
				fill();
			}
			identity_matrix();
			var tm = text_measure(joined_text.charAt(i));
			var text_width = tm[0];
			posx += text_width;
			if (posx >= width-200 && char_uppercase == ' ') {
				posy += Math.floor(tracking*my+60);
				posx = 90;
			}
		}
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function get_unique_chars() {
	var chars_array = joined_text.toUpperCase().split('');
	var unique_chars_array = chars_array.filter(function(char, index){
		return chars_array.indexOf(char) == index;
	}).sort();
	return unique_chars_array.join('');
}

function count_characters() {
	for(var i = 0; i < joined_text.length; i++) {
		var index = char_set.indexOf(joined_text.charAt(i).toUpperCase());
		if (index >= 0) counters[index]++;
	}
}

function change_font(f) {
	font = f;
}

function set_draw_modes(a, l, e, t) {
	drawalpha = a;
	drawlines = l;
	drawellipses = e;
	drawtext = t;

}

function set_mx_my(x, y) {
	mx = x;
	my = y;

}

function newseed() {
  s = Math.floor(Math.random()*100000);
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default drawing color
	mg.move_to(0, 0);
	mg.identity_matrix();
	mg.matrixcalc(outputmatrix, outputmatrix);
}
