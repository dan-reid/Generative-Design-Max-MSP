autowatch = 1;
var mg; // jit.mgraphics
var outputmatrix; // the matrix output from the [js] object
var pc;
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
var drawmode = 2;
var pointindex = 0;
var finished = false;
var tilecount;

var red = 1;
var green = 0.5;
var blue = 1;
var alpha = 1;

var bg = [red, green, blue, alpha];

setup();

function setup() {
	width = 600;
	height = 1070;

	mg = new JitterObject("jit.mgraphics", width, height);
	outputmatrix = new JitterMatrix(4, "char", width, height);
	pc = new PClone();
	img = new Image("dan.png");
	img_width = img.size[0];
	img_height = img.size[1];

	/*
	creating imgcopy not actually neccesary, its just for displaying the image
	in the patch. Notice at the first argument of this matrix is a name "imgcopy"
	meaning if we create a [jit.matrix] in our patch and name it imgcopy it will
	be a copy of the matrix we created below.
	*/
	imgcopy = new JitterMatrix("imgcopy", 4, "char", img_width, img_height);
	img.tonamedmatrix(imgcopy.name);

	tilewidth = width / img_width;
	tileheight = height / img_height;
	tilecount = img_height*img_width;
	drawmode = 4;
	scale_1 = 0.5;
	scale_2 = 0.5;
	//background(1, 0.897084, 1, 1);
	background(red, green, blue, alpha);
}

function draw() {
	if (!finished) {

		// background(0.698113, 0.827567, 1, 1);
		with(mg) {
			var drawendtime = millis() + 10;
			for(var y = pointindex; y < img_height && millis() < drawendtime; y++) {
				for(var x = 0; x < img_width; x++) {
					var px = tilewidth * x;
					var py = tileheight * y;
					var col = img.getpixel(x, y);
					var greyscale = (col[0]*0.222) + (col[1]*0.707) + (col[2]*0.071);

					switch(drawmode) {
					case 1:
						var w1 = pc.map(greyscale, 0, 1, 15, 0.1);
						set_source_rgb(0, 0, 0);
						set_line_width(w1 * scale_1);
						move_to(px, py)
						line_to(px + 5, py + 5);
						stroke();
						break;
					case 2:
						var r = 1.1284 * Math.sqrt(tilewidth*tilewidth*(1-greyscale));
						r = r * scale_1 * 3;
						var c2 = img.getpixel(Math.min(x+1, img_width-1), y);
						var greyscale2 = (c2[0]*0.222) + (c2[1]*0.707) + (c2[2]*0.071);
						var w6 = pc.map(greyscale, 0, 1, 25, 0);
						var hue = pc.hsb_to_rgb(col);
						var hsb = [hue[0], greyscale, 0.6];
						if (greyscale > 0.90) col = [Math.random(), greyscale, 0.6];
						var rgb = pc.hsb_to_rgb(col);
						set_source_rgb(rgb);
						ellipse(px, py, r, r);
						fill();
						break;
					case 3:
						var c2 = img.getpixel(Math.min(x+1, img_width-1), y);
						var greyscale2 = (c2[0]*0.222) + (c2[1]*0.707) + (c2[2]*0.071);
						var hue = pc.rgba_to_hsba(col);
						var w6 = pc.map(greyscale, 0, 1, 25, 0);
						var hue = pc.hsb_to_rgb(col);
						var hsb = [hue[0], greyscale, 0.6];
						var rgb = pc.hsb_to_rgb(col);
						set_source_rgb(rgb);
						set_line_width(10 * scale_2);
						var l3 = pc.map(greyscale, 0, 1, 30, 0.1);
						l3 = l3 * scale_1;
						move_to(px, py);
						line_to(px+l3, py+l3);
						stroke();
						break;
					case 4:
						var c2 = img.getpixel(Math.min(x+1, img_width-1), y);
						var greyscale2 = (c2[0]*0.222) + (c2[1]*0.707) + (c2[2]*0.071);
						var w6 = pc.map(greyscale, 0, 1, 25, 7);
						var hue = pc.hsb_to_rgb(col);
						var hsb = [hue[0], greyscale, 0.6];
						if (greyscale > 0.90) col = [Math.random(), greyscale, 0.6];
						var rgb = pc.hsb_to_rgb(col);
						set_source_rgb(rgb);
						ellipse(px, py, w6 * scale_2, w6 * scale_1);
						fill();
						break;
					}
				}
				pointindex = y;
			}
		}
		if (pointindex >= img_height-1) finished = true;
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function millis() {
	var ms = new Date().getTime();
	return ms;
}

function set_params(d, x, y) {
	drawmode = d;
	scale_1 = x;
	scale_2 = y;
	reset();
}

function marker(x, y, w, h) {
  var tip = pc.create_vector(x, y);
  var left = pc.create_vector(x-w/2, y+h);
  var right = pc.create_vector(x+w/2, y+h);
  var p1 = PClone.Vector.sub(right, tip);
  var p2 = PClone.Vector.sub(left, right);

  with(mg) {
    move_to(tip.x, tip.y);
    rel_line_to(p1.x, p1.y);
    rel_line_to(p2.x, p2.y);
    close_path();
    fill();
  }
}

function reset() {
	background(bg[0], bg[1], bg[2], bg[3]);
	finished = false;
	pointindex = 0;
}

function bg_col(r, g, b, a) {
	bg = [r, g, b, a];
	reset();
	
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default drawing color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
