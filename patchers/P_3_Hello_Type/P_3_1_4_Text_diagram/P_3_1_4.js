autowatch = 1;
var { GenerativeDesign } = require('GenerativeDesign');
var { Treemap } = GenerativeDesign;
var mg;
var outputmatrix;
var bg; // background color
var datapath;
var width;
var height;

var font = 'Ariel';
var joinedtext = [];
var stopwords = [];
var treemap;
var textfile;
var dosort = true;
var usestopwords = true;
var rowdirection = 'both';

// you can set a min and max word length here:
// if you'd perfer not to, just the min to 0, and the
// max to some really high number.
var minwordlength = 3,
	maxwordlength = 10;

setup();

function setup() {
	datapath = getpath(); // get the path to the data folder
	width = 1024;
	height = 1024;
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	bg = [1, 1, 1, 1];

	clear();
}

function analyse_text(t) {
	textfile = t;
	/*
	the original version found in both processing and p5js
	doesn't use a stopword list, rather the treemap class
	has an 'ignore' array build into it. This works on based
	on the index of a word already in the treemap, rather than
	a reference to word itself. See the orginal p5js sketch
	for an example on how to use it.
	*/
	stopwords = load_strings(datapath + 'stopwords.txt');
	// load the textfile
	joinedtext = load_strings(datapath + textfile);
	joinedtext = joinedtext.join(' ');
	// gets rid of numbers
	joinedtext = joinedtext.replace(/\d+/g, '');
	var words = joinedtext.match(/\w+/g);

	treemap = new Treemap(1, 1, width - 3, height - 3, {
		sort: dosort,
		direction: rowdirection,
		padding: 2,
		ignore: [],
	});

	//count words
	if (usestopwords) {
		for (var i = 0; i < words.length; i++) {
			var w = words[i].toLowerCase();
			if (w.length < minwordlength || w.length > maxwordlength) continue;
			var stopword = test_stopword(w);
			if (!stopword) {
				treemap.add_data(w);
			}
		}
	} else {
		for (var i = 0; i < words.length; i++) {
			var w = words[i].toLowerCase();
			if (w.length < minwordlength || w.length > maxwordlength) continue;
			treemap.addData(w);
		}
	}
	treemap.calculate();
	draw();
}

function draw() {
	clear();

	with (mg) {
		select_font_face(font);
		for (var i = 0; i < treemap.items.length; i++) {
			var item = treemap.items[i];

			rectangle(item.x, item.y, item.w, item.h);
			stroke();

			var word = item.data;
			set_font_size(100); // set an initial font size
			var tm = text_measure(word); // measure the width of the word based on this size
			var fontsize = (100 * (item.w * 0.9)) / tm[0]; // scale it to fit the rectangle
			fontsize = Math.min(fontsize, item.h * 0.9);
			set_font_size(fontsize); // set the scaled fontsize
			tm = text_measure(word); // measure the width with the new font size in order to centre it
			move_to(item.x - tm[0] / 2 + item.w / 2, item.y + item.h * 0.8); // set the cursor
			show_text(word); // draw the text
			fill();
		}
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

function getpath() {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat';
	p = p.replace(n, 'data/');
	return p;
}

function test_stopword(word) {
	for (var i = 0; i < stopwords.length; i++) {
		if (word == stopwords[i]) {
			return true;
			break;
		}
	}
	return false;
}

function applyfilter(v) {
	usestopwords = v;
	analyse_text(textfile);
	draw();
}

function setrowdirection(d) {
	rowdirection = d;
	treemap.options.direction = rowdirection;
	treemap.calculate();
	draw();
}

function sort(s) {
	dosort = s;
	treemap.options.sort = dosort;
	treemap.calculate();
	draw();
}

function change_font(f) {
	font = f;
	draw();
}

function clear() {
	with (mg) {
		set_source_rgba(bg);
		paint();
		set_source_rgba(0, 0, 0, 1); // default drawing color
		move_to(0, 0);
		identity_matrix();
		matrixcalc(outputmatrix, outputmatrix);
	}
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 *
 * @ignore
 */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
