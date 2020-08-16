autowatch = 1;
include('gd.mouseinfo');

var { m4x } = require('m4x');
var datapath;
var mg;
var m4;
var outputmatrix;
var width;
var height;
var tilecount;
var maxdist;
var tilewidth;
var tileheight;
var sizemode = 0;
var shapesize = 0.5;
var newshapesize = shapesize;
var shapeangle = 0;
var shape = 'module_1.svg';

setup();

function setup() {
	datapath = getpath();
	width = 500;
	height = 500;
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	m4 = new m4x();
	tilecount = 10;
	tilewidth = width / tilecount;
	tileheight = height / tilecount;
	maxdist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}

function draw() {
	background(1, 1, 1, 1);

	for (var y = 0; y < tilecount; y++) {
		for (var x = 0; x < tilecount; x++) {
			var posX = tilewidth * x + tilewidth / 2;
			var posY = tileheight * y + tilewidth / 2;
			var angle = Math.atan2(mousey - posY, mousex - posX + m4.radians(shapeangle));
			if (sizemode == 0) {
				newshapesize = shapesize;
			} else if (sizemode == 1) {
				newshapesize = shapesize * 1.5 - m4.map(m4.dist(mousex, mousey, posX, posY), 0, maxdist, 0.15, shapesize);
			} else if (sizemode == 2) {
				newshapesize = m4.map(m4.dist(mousex, mousey, posX, posY), 0, maxdist, 0.15, shapesize);
			}
			mg.set_source_rgba(0, 1, 0, 1);
			mg.translate(posX, posY);
			mg.rotate(angle);
			mg.scale(newshapesize, newshapesize);
			mg.svg_render(datapath + shape);
			mg.identity_matrix();
		}
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function setscale(s) {
	shapesize = s;
}

function setsizemode(m) {
	sizemode = m;
}

function setmodule(m) {
	if (m == 1) shape = 'module_1.svg';
	if (m == 2) shape = 'module_2.svg';
	if (m == 3) shape = 'module_3.svg';
	if (m == 4) shape = 'module_4.svg';
	if (m == 5) shape = 'module_5.svg';
	if (m == 6) shape = 'module_6.svg';
	if (m == 7) shape = 'module_7.svg';
}

function getpath() {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat';
	p = p.replace(n, 'data/');
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

/*
you can also copy and paste the svg code straight into the script as text,
instead of loading a the file.
*/

// var module_1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 								<svg version=\"1.0\"id=\" Ebene_1\"xmlns=\"http://www.w3.org/2000/svg\" \
// 								x=\"0px\" y=\"0px\" width=\"50px\" height=\"50px\" viewBox=\" 0 0 50 50\" \
// 								enable-background=\"new 0 0 50 50\" ml:space=\"preserve\"> \
// 								<path d=\"M81.204,95.717L4.699,19.212c-3.907-3.905-3.907-10.236,0-14.141l0,0c3.905-3.907,10.236-3.907,14.141,0l0,0l76.505,76.504 \
// 								c3.906,3.904,3.906,10.235,0,14.141l0,0c-1.953,1.953-4.512,2.93-7.07,2.93l0,0C85.715,98.646,83.156,97.67,81.204,95.717 \
// 								L81.204,95.717z\"/>\
// 								</svg>";
//
//
// var module_2 = "<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 								<svg version=\"1.0\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" \
// 								width=\"25px\" height=\"25px\" viewBox=\" 0 0 25 25\" enable-background=\"new 0 0 25 25\" \
// 								xml:space=\"preserve\"> \
// 								<polygon fill=\"#1E1E1E\" points=\"47.999,136.5 47.999,-42.499 52,-42.499 52,136.5 47.999,136.5\"/> \
// 								<path fill=\"#1E1E1E\" d=\"M37.999-51.003C38.001-57.633,43.372-63.002,50-63.004l0,0c6.627,0.002,11.999,5.372,12,12.001l0,0 \
// 								c-0.002,6.627-5.373,11.999-12,12l0,0C43.372-39.005,38.001-44.376,37.999-51.003L37.999-51.003z M41.999-51.003 \
// 								c0.008,4.418,3.582,7.992,8,7.999l0,0c4.417-0.006,7.992-3.581,7.999-7.999l0,0c-0.007-4.418-3.581-7.993-7.999-8l0,0 \
// 								C45.581-58.996,42.007-55.422,41.999-51.003L41.999-51.003z\"/> \
// 								<path fill=\"#1E1E1E\" d=\"M38,145c0-6.629,5.371-12.001,12-12.001l0,0c6.627,0,11.998,5.372,11.998,12.001l0,0 \
// 								c0,6.627-5.371,11.998-11.998,12l0,0C43.371,156.998,38,151.627,38,145L38,145z M41.999,145c0.008,4.417,3.584,7.991,8.001,7.999 \
// 								l0,0c4.417-0.008,7.991-3.582,7.999-7.999l0,0c-0.008-4.42-3.582-7.993-7.999-8l0,0C45.583,137.007,42.007,140.58,41.999,145 \
// 								L41.999,145z\"/> \
// 								<polygon fill=\"#1E1E1E\" points=\"18,48.998 18,44.998 81.5,44.998 81.5,48.998 18,48.998\"/> \
// 								<path fill=\"#1E1E1E\" d=\"M79.306,46.998c0.002-6.629,5.373-11.999,12.001-12.001l0,0c6.628,0.002,11.999,5.372,12.001,12.001l0,0 \
// 								c-0.002,6.627-5.373,11.999-12.001,11.999l0,0v-1.998v-2.001c4.418-0.009,7.991-3.582,8-8l0,0c-0.009-4.417-3.582-7.993-8-8l0,0 \
// 								c-4.418,0.006-7.991,3.582-7.999,8l0,0c0.008,4.417,3.584,7.991,7.999,8l0,0v2.001v1.998C84.679,58.996,79.308,53.625,79.306,46.998 \
// 								L79.306,46.998z\"/> \
// 								<path fill=\"#1E1E1E\" d=\"M-2.501,46.997c0.002-6.629,5.372-11.999,12-12l0,0c6.629,0.002,11.999,5.372,12,12l0,0 \
// 								c-0.002,6.627-5.371,11.998-12,12l0,0v-2v-1.999c4.419-0.01,7.992-3.583,8-8.001l0,0c-0.008-4.417-3.581-7.992-8-8l0,0 \
// 								c-4.418,0.008-7.991,3.583-8,8l0,0c0.008,4.418,3.581,7.991,8,8.001l0,0v1.999v2C2.87,58.995-2.499,53.624-2.501,46.997 \
// 								L-2.501,46.997z\"/> \
// 								</svg>";
//
// var module_3 = 	"<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 								 <svg version=\"1.1\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" \
// 								 width=\"50px\" height=\"50px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\"> \
// 								 <circle cx=\"0.329\" cy=\"0.329\" r=\"20.079\"/> \
// 								 <circle opacity=\"0.2\" cx=\"4.882\" cy=\"4.882\" r=\"22.288\"/> \
// 								 </svg>";
//
// var module_4 = 	"<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 								 <svg version=\"1.1\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" \
// 								 x=\"0px\" y=\"0px\"	width=\"50px\" height=\"50px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\"> \
// 								 <polygon points=\"259.528,27.279 285.617,70.354 242.645,27.381 285.617,-15.592\"/> \
// 								 <rect x=\"200.187\" y=\"9.271\" transform=\"matrix(0.7071 0.7071 -0.7071 0.7071 83.3973 -146.379)\" opacity=\"0.2\" width=\"36.422\" height=\"36.423\"/> \
// 								 </svg>";
//
// var module_5 = 	 "<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 									<svg version=\"1.1\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" \
// 									width=\"50px\" height=\"50px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\"> \
// 									<path d=\"M81.924,63.221C52.959,51.842,33.867,22.851,6.388,8.119C3.452,6.663,0.452,5.476-2.695,4.687 \
// 									c-2.53-1.023-5.03-1.929-7.547-2.71c-7.54-2.336-15.248-3.587-23.285-2.566c-2.987,0.502-5.941,1.381-8.869,2.768 \
// 									c-3.881,2.729-6.228,4.181-6.705,3.704c-0.478-0.478,0.975-2.824,4.062-6.356c2.539-2.131,4.66-2.838,7.488-4.252 \
// 									c9.546-1.768,18.031,0,26.428,2.74C-8.32-1.07-5.527-0.045-2.675,1.027C-0.08,2.063,2.441,3.15,4.928,4.208 \
// 									c8.433,3.793,28.23,16.993,36.716,19.822C39.522,13.423,23.968-5.434,20.864-15.554c-1.196-2.828-2.334-5.671-3.205-8.579 \
// 									c-1.191-3.083-2.321-6.144-3.206-9.239c-1.772-6.191-2.583-12.532-0.852-19.331c0.551-2.507,1.377-4.934,2.553-7.245 \
// 									s2.7-4.508,4.647-6.554c3.642-3.008,5.988-4.461,6.465-3.984s-0.976,2.824-3.861,6.589c-1.91,2.79-3.305,5.666-4.297,8.607 \
// 									c-0.978,2.945-1.552,5.956-1.803,9.054c0.049,3.383,0.424,6.692,1.047,9.948c0.625,3.259,1.496,6.462,2.549,9.646 \
// 									c0.982,3.063,2.095,6.028,3.314,8.913C38.109,10.123,60.03,33.457,79.112,58.177C80.604,60.362,81.541,62.037,81.924,63.221z\"/> \
// 									</svg>";
//
// var module_6 = 		"<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 									<svg version=\"1.0\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" \
// 									width=\"50px\" height=\"50px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" \
// 									xml:space=\"preserve\"> \
// 									<g> \
// 									<path d=\"M-3.203,95.5c-25.406,0-46-20.595-46-46s20.594-46,46-46c24.604,0,124.08,19.317,125.32,43.614 \
// 									C120.873,20.976,19.908,0.166-6.539,0.166c-27.246,0-49.334,22.087-49.334,49.334c0,27.246,22.088,49.334,49.334,49.334 \
// 									c26.447,0,127.412-20.811,128.656-46.947C120.877,76.183,21.4,95.5-3.203,95.5z\"/> \
// 									<path d=\"M4.129,88.166c-21.355,0-38.666-17.312-38.666-38.666s17.311-38.666,38.666-38.666c20.686,0,116.963,16.246,117.998,36.675 \
// 									C121.086,24.87,23.025,6.834,0.129,6.834c-23.564,0-42.666,19.102-42.666,42.666c0,23.564,19.102,42.666,42.666,42.666 \
// 									c22.896,0,120.957-18.036,121.998-40.676C121.092,71.92,24.814,88.166,4.129,88.166z\"/> \
// 									<path d=\"M11.963,80.333c-17.029,0-30.834-13.804-30.834-30.833c0-17.029,13.805-30.833,30.834-30.833 \
// 									c16.496,0,109.35,12.955,110.176,29.246c-0.83-18.5-95.471-33.246-114.176-33.246c-19.238,0-34.834,15.595-34.834,34.833 \
// 									c0,19.238,15.596,34.833,34.834,34.833c18.705,0,113.346-14.745,114.176-33.245C121.313,67.379,28.459,80.333,11.963,80.333z\"/> \
// 									<path d=\"M15.963,22.667c-14.82,0-26.834,12.014-26.834,26.833S1.143,76.333,15.963,76.333c14.818,0,106.215-12.014,106.215-26.833 \
// 									S30.781,22.667,15.963,22.667z M20.629,71.666c-12.242,0-22.166-9.924-22.166-22.166s9.924-22.166,22.166-22.166 \
// 									S122.178,37.258,122.178,49.5S32.871,71.666,20.629,71.666z\"/> \
// 									<path d=\"M24.797,31.5c-9.941,0-18,8.059-18,18c0,9.941,8.059,18,18,18s97.383-8.059,97.383-18 \
// 									C122.18,39.559,34.738,31.5,24.797,31.5z M29.129,63.167c-7.549,0-13.668-6.119-13.668-13.667s6.119-13.667,13.668-13.667 \
// 									s93.049,6.119,93.049,13.667S36.678,63.167,29.129,63.167z\"/> \
// 									<path d=\"M37.297,55c-3.037,0-5.5-2.463-5.5-5.5c0-3.038,2.463-5.5,5.5-5.5c2.844,0,84.566,2.159,84.852,4.928 \
// 									c-0.297-5.209-83.986-9.345-89.27-9.345c-5.477,0-9.918,4.44-9.918,9.917c0,5.477,4.441,9.917,9.918,9.917 \
// 									c5.283,0,88.973-4.136,89.27-9.345C121.863,52.841,40.141,55,37.297,55z\"/> \
// 									</g> \
// 									</svg>";
//
// var module_7 =		"<?xml version=\"1.0\" encoding=\"utf-8\"?> \
// 									 <svg version=\"1.0\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" \
// 									 width=\"50px\" height=\"50px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" \
// 									 xml:space=\"preserve\"> \
// 									 <g> \
// 									 <circle cx=\"49.833\" cy=\"49.5\" r=\"49.334\"/> \
// 									 <circle fill=\"#FFFFFF\" cx=\"53.168\" cy=\"49.5\" r=\"46\"/> \
// 									 <circle cx=\"56.5\" cy=\"49.5\" r=\"42.666\"/> \
// 									 <circle fill=\"#FFFFFF\" cx=\"60.5\" cy=\"49.5\" r=\"38.666\"/> \
// 									 <circle cx=\"64.334\" cy=\"49.5\" r=\"34.833\"/> \
// 									 <circle fill=\"#FFFFFF\" cx=\"68.334\" cy=\"49.5\" r=\"30.833\"/> \
// 									 <circle cx=\"72.334\" cy=\"49.5\" r=\"26.833\"/> \
// 									 <circle fill=\"#FFFFFF\" cx=\"77\" cy=\"49.5\" r=\"22.166\"/> \
// 									 <circle cx=\"81.168\" cy=\"49.5\" r=\"18\"/> \
// 									 <circle fill=\"#FFFFFF\" cx=\"85.5\" cy=\"49.5\" r=\"13.667\"/> \
// 									 <circle cx=\"89.25\" cy=\"49.5\" r=\"9.917\"/> \
// 									 <circle fill=\"#FFFFFF\" cx=\"93.668\" cy=\"49.5\" r=\"5.5\"/> \
// 									 </g> \
// 									 </svg>";
