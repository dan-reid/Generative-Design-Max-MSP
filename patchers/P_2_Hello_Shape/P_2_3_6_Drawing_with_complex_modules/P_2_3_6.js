autowatch = 1;
var { PClone } = require('PClone');
var mg;
var pc;
var width;
var height;
var outputmatrix;
var datapath;

var leftclick = 0;
var rightclick = 0;
var mousedown = false;
var mousex = 0;
var mousey = 0;

var tilesize = 50;
var grid_resolution_x;
var grid_resolution_y;
var tiles = [];

var do_draw_grid = true;
var debugmode = false;

setup();

function setup() {
	width = 500;
	height = 500;
	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);
	pc = new PClone();
	datapath = getpath();

	grid_resolution_x = Math.round(width / tilesize) + 2;
	grid_resolution_y = Math.round(height / tilesize) + 2;

	init_tiles();
}

function draw() {
	background(1, 1, 1, 1);

	if (mousedown) {
		if (leftclick) set_tile();
		if (rightclick) unset_tile();
	}

	if (do_draw_grid) draw_grid();
	draw_modules();

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function init_tiles() {
	for (var x = 0; x < grid_resolution_x; x++) {
		tiles[x] = [];
		for (var y = 0; y < grid_resolution_y; y++) {
			tiles[x][y] = 0;
		}
	}
}

function set_tile() {
	// // convert mouse position to grid coordinates
	var x = Math.floor(mousex / tilesize) + 1;
	x = pc.constrain(x, 1, grid_resolution_x - 2);
	var y = Math.floor(mousey / tilesize) + 1;
	y = pc.constrain(y, 1, grid_resolution_y - 2);
	tiles[x][y] = 1;
}

function unset_tile() {
	var x = Math.floor(mousex / tilesize) + 1;
	x = pc.constrain(x, 1, grid_resolution_x - 2);
	var y = Math.floor(mousey / tilesize) + 1;
	y = pc.constrain(y, 1, grid_resolution_y - 2);
	tiles[x][y] = 0;
}

function draw_grid() {
	for (var x = 0; x < grid_resolution_x; x++) {
		for (var y = 0; y < grid_resolution_y; y++) {
			var position_x = tilesize * x - tilesize / 2;
			var position_y = tilesize * y - tilesize / 2;

			mg.set_source_rgb(1, 1, 1);
			mg.rectangle(position_x - tilesize / 2, position_y - tilesize / 2, tilesize, tilesize);
			mg.fill();
			if (debugmode) {
				if (tiles[x][y] == 1) mg.set_source_rgb(0.7, 0.7, 0.7);
				mg.rectangle(position_x - tilesize / 2, position_y - tilesize / 2, tilesize, tilesize);
				mg.fill();
			}
			mg.set_source_rgb(0, 0, 0);
			mg.rectangle(position_x - tilesize / 2, position_y - tilesize / 2, tilesize, tilesize);
			mg.stroke();
		}
	}
}

function draw_modules() {
	for (var x = 0; x < grid_resolution_x - 1; x++) {
		for (var y = 0; y < grid_resolution_y - 1; y++) {
			// only use active tiles
			if (tiles[x][y]) {
				var NORTH = tiles[x][y - 1].toString();
				var WEST = tiles[x - 1][y].toString();
				var SOUTH = tiles[x][y + 1].toString();
				var EAST = tiles[x + 1][y].toString();

				var binary_result = NORTH + WEST + SOUTH + EAST;

				// convert binary string to a demimal value from 0 - 15
				var decimal_result = parseInt(binary_result, 2);

				var position_x = tilesize * x - tilesize / 1;
				var position_y = tilesize * y - tilesize / 1;

				mg.translate(position_x, position_y);
				mg.scale(0.5, 0.5);
				mg.svg_render(module(decimal_result));
				mg.identity_matrix();
			}
		}
	}
}

function println() {
	for (var i = 0; i < arguments.length; i++) {
		post(arguments[i] + '\n');
	}
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

function module(m) {
	switch (m) {
		case 0:
			return datapath + '00.svg';
		case 1:
			return datapath + '01.svg';
		case 2:
			return datapath + '02.svg';
		case 3:
			return datapath + '03.svg';
		case 4:
			return datapath + '04.svg';
		case 5:
			return datapath + '05.svg';
		case 6:
			return datapath + '06.svg';
		case 7:
			return datapath + '07.svg';
		case 8:
			return datapath + '08.svg';
		case 9:
			return datapath + '09.svg';
		case 10:
			return datapath + '10.svg';
		case 11:
			return datapath + '11.svg';
		case 12:
			return datapath + '12.svg';
		case 13:
			return datapath + '11.svg';
		case 14:
			return datapath + '14.svg';
		case 15:
			return datapath + '15.svg';
		default:
			return datapath + '00.svg';
	}
}

function mousemoved(x, y, left, right) {
	leftclick = left;
	rightclick = right;

	if (leftclick) {
		mousedown = true;
		mousex = x;
		mousey = y;
	} else {
		mousedown = false;
	}
}
