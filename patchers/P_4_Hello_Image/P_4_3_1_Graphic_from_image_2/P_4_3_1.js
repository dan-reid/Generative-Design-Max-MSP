autowatch = 1;
var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;
var width;
var height;

var img;
var datafolder;

var shapes;
var pointindex = 0;
var binary = false;
var finished = false;

setup();

function setup() {
	width = 600;
	height = 900;
	// jit.mgraphics
	mg = new JitterObject('jit.mgraphics', width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();
	var pic = prepend_path('pic.png');
	img = new Image(pic);
	shapes = load_svg_files(prepend_path());
	background(1, 1, 1, 1);
}

function drawgraphic() {
	if (!finished) {
		var drawendtime = Math.floor(millis() + 100);
		for (y = pointindex; y < img.size[1] && millis() <= drawendtime; y++) {
			//post(y);
			for (x = 0; x < img.size[0]; x++) {
				var tilewidth = width / img.size[0];
				var tileheight = height / img.size[1];
				var pos_x = tilewidth * x;
				var pos_y = tileheight * y;
				var c = img.getpixel(x, y);

				var grayscale = c[0] * 0.222 + c[1] * 0.707 + c[2] * 0.071;
				if (binary) {
					// make pixels either 0 or 1
					grayscale = Math.round(grayscale);
				}

				var gradient_to_index = Math.round(grayscale * (shapes.length - 1));

				mg.translate(pos_x, pos_y);
				mg.scale(1 / tilewidth, 1 / tileheight);
				mg.svg_render(prepend_path(shapes[gradient_to_index]));
				mg.identity_matrix();
			}
			pointindex = y;
		}
		if (pointindex >= img.size[1] - 1) finished = true;
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function msg_int(i) {
	background(1, 1, 1, 1);
	binary = i;
	finished = false;
	pointindex = 0;
}

function prepend_path(f) {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat';
	p = p.replace(n, 'data/');

	if (f) return p + f;
	return p;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}

function millis() {
	var d = new Date().getTime();
	return d;
}

function load_svg_files(folder) {
	var f = new Folder(folder);
	var files = [];

	f.reset();
	while (!f.end) {
		var thefile = new File(f.pathname + '/' + f.filename);
		if (thefile.isopen) thefile.close();
		var filetype = f.filename.split('.')[1];

		// f.filetype returns a string with a space at the end.
		// "svg "
		// so you can use f.filetype === "svg " either
		if (filetype === 'svg') {
			files.push(f.filename);
		}
		f.next();
	}
	f.close();
	return files;
}
