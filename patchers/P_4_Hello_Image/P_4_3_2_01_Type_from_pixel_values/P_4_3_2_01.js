autowatch = 1;

var { m4x } = require('m4x');
var mg;
var m4;
var outputmatrix;

var width = 533;
var height = 796;

var img;

var input_text =
	"All the world's a stage, And all the men and women merely players; They have their exits and their entrances; And one man in his time plays many parts, His acts being seven ages. At first the infant, Mewling and puking in the nurse's arms; Then the whining school-boy, with his satchel And shining morning face, creeping like snail Unwillingly to school. And then the lover, Sighing like furnace, with a woeful ballad Made to his mistress' eyebrow. Then a soldier, Full of strange oaths, and bearded like the pard, Jealous in honour, sudden and quick in quarrel, Seeking the bubble reputation Even in the cannon's mouth. And then the justice, In fair round belly with good capon lin'd, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part. The sixth age shifts Into the lean and slipper'd pantaloon, With spectacles on nose and pouch on side, His youthful hose, well sav'd, a world too wide For his shrunk shank; and his big manly voice, Turning again toward childish treble, pipes And whistles in his sound. Last scene of all, That ends this strange eventful history, Is second childishness and mere oblivion; Sans teeth, sans eyes, sans taste, sans every thing.";

var blackandwhite = false;
var font_size_static = false;
var spacing = 12;
var kerning = 0.5;
var font_size_max = 20;
var font_size_min = 10;

var finished = false;
setup();

function setup() {
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();

	mg.select_font_face('Times');
	mg.set_font_size(10);

	img = new Image('pic.png');
}

function draw() {
	if (!finished) {
		background(1, 1, 1, 1);
		var x = 0;
		var y = 10;
		var counter = 0;

		while (y < height) {
			var img_x = Math.round(m4.map(x, 0, width, 0, img.size[0]));
			var img_y = Math.round(m4.map(y, 0, height, 0, img.size[1]));
			var c = img.getpixel(img_x, img_y);
			var greyscale = c[0] * 0.222 + c[1] * 0.707 + c[2] * 0.071;

			mg.save();
			mg.translate(x, y);

			if (font_size_static) {
				mg.set_font_size(font_size_max);
				if (blackandwhite) {
					mg.set_source_rgb(greyscale, greyscale, greyscale);
				} else {
					mg.set_source_rgb(c);
				}
			} else {
				var font_size = m4.map(greyscale, 0, 1, font_size_max, font_size_min);
				font_size = Math.max(font_size, 1);
				mg.set_font_size(font_size);
				if (blackandwhite) {
					mg.set_source_rgb(m4.color(0));
				} else {
					mg.set_source_rgb(c);
				}
			}

			var letter = input_text.charAt(counter);
			mg.move_to(0, 0);
			mg.show_text(letter);
			mg.stroke();

			var letter_width = mg.text_measure(letter)[0] + kerning;
			x += letter_width;

			mg.restore();

			if (x + letter_width >= width) {
				x = 0;
				y += spacing;
			}

			counter++;

			if (counter >= input_text.length) {
				counter = 0;
			}
		}
	}

	finished = true;

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
