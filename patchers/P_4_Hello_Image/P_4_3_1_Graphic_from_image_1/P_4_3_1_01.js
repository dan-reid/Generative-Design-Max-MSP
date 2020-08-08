autowatch = 1;
var { m4x } = require('m4x');
var mg; // jit.mgraphics
var outputmatrix; // the matrix output from the [js] object
var m4;
var width;
var height;
var scale_1;
var scale_2;

var img; // Image
var img_width;
var img_height;
var imgcopy;
var tilewidth;
var tileheight;
var drawmode;

setup();

function setup() {
	width = 700;
	height = 600;

	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	m4 = new m4x();
	img = new Image('laurie.png');
	img_width = img.size[0];
	img_height = img.size[1];

	/*
	creating imgcopy not actually neccesary, its just for displaying the image
	in the patch. Notice at the first argument of this matrix is a name "imgcopy"
	meaning if we create a [jit.matrix] in our patch and name it imgcopy it will
	be a copy of the matrix we created below.
	*/
	imgcopy = new JitterMatrix('imgcopy', 4, 'char', img_width, img_height);
	img.tonamedmatrix(imgcopy.name);

	tilewidth = width / img_width;
	tileheight = height / img_height;
	drawmode = 1;
	scale_1 = 0.1;
	scale_2 = 0.1;
}

function draw() {
	background(1, 1, 1, 1);
	with (mg) {
		for (var y = 0; y < img_height; y++) {
			for (var x = 0; x < img_width; x++) {
				var px = tilewidth * x;
				var py = tileheight * y;
				var col = img.getpixel(x, y);
				var greyscale = col[0] * 0.222 + col[1] * 0.707 + col[2] * 0.071;

				switch (drawmode) {
					case 1:
						var w1 = m4.map(greyscale, 0, 1, 15, 0.1);
						set_source_rgb(0, 0, 0);
						set_line_width(w1 * scale_1);
						move_to(px, py);
						line_to(px + 5, py + 5);
						stroke();
						break;
					case 2:
						set_source_rgb(0, 0, 0);
						var r = 1.1284 * Math.sqrt(tilewidth * tilewidth * (1 - greyscale));
						r = r * scale_1 * 3;
						ellipse(px, py, r, r);
						fill();
						break;
					case 3:
						set_source_rgb(0, 0, 0);
						set_line_width(10 * scale_2);
						var l3 = m4.map(greyscale, 0, 1, 30, 0.1);
						l3 = l3 * scale_1;
						move_to(px, py);
						line_to(px + l3, py + l3);
						stroke();
						break;
					case 4:
						var w4 = m4.map(greyscale, 0, 1, 5, 0);
						set_line_width(w4 * scale_1 + 0.1);
						var l4 = m4.map(greyscale, 0, 1, 35, 0);
						l4 = l4 * scale_2;
						translate(px, py);
						rotate(greyscale * Math.PI);
						move_to(0, 0);
						line_to(0 + l4, 0 + l4);
						identity_matrix();
						stroke();
						break;
					case 5:
						var w5 = m4.map(greyscale, 0, 1, 3, 0.2);
						set_line_width(w5 * scale_2 + 0.1);
						// get the neighbour pixel and limit it to image width
						var c2 = img.getpixel(Math.min(x + 1, img_width - 1), y);
						set_source_rgb(c2[0], c2[1], c2[2]);
						var greyscale2 = c2[0] * 0.222 + c2[1] * 0.707 + c2[2] * 0.071;
						var h5 = 50 * scale_2;
						var d1 = m4.map(greyscale, 0, 1, h5, 0);
						var d2 = m4.map(greyscale2, 0, 1, h5, 0);
						move_to(px - d1, py + d2);
						line_to(px + tilewidth - d2, py + d2);
						stroke();
						break;
					case 6:
						var w6 = m4.map(greyscale, 0, 1, 25, 0);
						set_source_rgb(col[0], col[1], col[2]);
						ellipse(px, py, w6 * scale_2, w6 * scale_1);
						fill();
						break;
					case 7:
						var w7 = m4.map(greyscale, 0, 1, 2, 0.1);
						set_line_width(w7);
						set_source_rgba(col[0], col[1], col[2], 1 * scale_1);
						translate(px, py);
						rotate(greyscale * Math.PI * scale_2);
						rectangle(0, 0, 15, 15);
						identity_matrix();
						stroke();
						break;
					case 8:
						set_source_rgb(greyscale, greyscale * scale_1, 1 * scale_2);
						rectangle(px, py, 3.5, 3.5);
						rectangle(px + 4, py, 3.5, 3.5);
						rectangle(px, py + 4, 3.5, 3.5);
						rectangle(px + 4, py + 4, 3.5, 3.5);
						fill();
						break;
					case 9:
						set_source_rgb(1, greyscale, 0);
						translate(px, py);
						rotate(greyscale * Math.PI);
						set_line_width(1);
						rectangle(0, 0, 15 * scale_1, 15 * scale_2);
						stroke();
						var w9 = m4.map(greyscale, 0, 1, 15, 0.1);
						set_line_width(w9);
						set_source_rgba(0, 0, 0, 0.4);
						ellipse(0, 0, 10, 5);
						identity_matrix();
						stroke();
				}
			}
		}
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function set_params(d, x, y) {
	drawmode = d;
	scale_1 = x;
	scale_2 = y;
	draw();
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default drawing color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
