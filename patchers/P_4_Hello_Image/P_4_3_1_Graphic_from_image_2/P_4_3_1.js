autowatch = 1;
var mg;
var pc;
var outputmatrix;
var width;
var height;

var img;
var datafolder;

var shapes;

setup();

function setup() {
	width = 670;
	height = 970;
	// jit.mgraphics
	mg = new JitterObject("jit.mgraphics", width, height);
	// the matrix to store and output the frame
	outputmatrix = new JitterMatrix(4, "char", width, height);

	pc = new PClone();
	var pic = prepend_path('pic.png')
	img = new Image(pic);
	shapes = loadfiles(prepend_path());
	post(shapes[1]);
	var a = [1, 1, 1, 1];

}

function draw() {
	background(1, 1, 1, 1);

	for (x = 0; x < img.size[0]; x++) {
		for (y = 0; y < img.size[1]; y++) {
			var tilewidth = width / img.size[0];
			var tileheight = height / img.size[1];
			var pos_x = tilewidth * x;
			var pos_y = tileheight * y;
			var c = img.getpixel(x, y);
			// post(c);
			var grayscale = c[0] * 0.222 + c[1] * 0.707 + c[2] * 0.071;
			var gradient_to_index = Math.floor(pc.map(grayscale, 0, 1, 1, shapes.length - 2, 1));
			// post(gradient_to_index+'\n');
			mg.translate(pos_x, pos_y);
			mg.scale(0.125, 0.125);
			mg.svg_render(prepend_path(shapes[gradient_to_index]));
			mg.identity_matrix();

		}
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function println() {
	for (var i = 0; i < arguments.length; i++) {
		post(arguments[i] + "\n");
	}
}

function prepend_path(f) {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat'
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

function loadfiles(folder) {


	var f = new Folder(folder);
	var files = [];

	f.reset();
	while (!f.end) {
		var thefile = new File(f.pathname + "/" + f.filename);
		if (thefile.isopen) {
			thefile.close();
		} else {
		}

		files.push(f.filename);

		f.next();
	}
	f.close();
	return files;
}
