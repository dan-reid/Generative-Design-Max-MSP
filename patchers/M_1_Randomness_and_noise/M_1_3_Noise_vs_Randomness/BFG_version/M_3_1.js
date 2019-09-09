autowatch = 1;
var mg; // jit.mgraphics
var jit_bfg; // jit.bfg
var jit_noise;// jit.noise
var bfg_mat; // the matrices where each set of random values are stored
var noise_mat;

var bg = [1, 1, 1, 1]; // background color
var width = 512;
var height = 128;
var noiseOffset = 0;
var bfgOffset = 0;


setup();


function setup() {
	mg = this.patcher.getnamed("M_3_1"); // get jit.mgraphics by its scripting name
	jit_bfg = this.patcher.getnamed("mybfg"); // get jit.bfg by its scripting name
	jit_noise = this.patcher.getnamed("mynoise");// get jit.noise by its scripting name
	bfg_mat = new JitterMatrix("BFG", 1, "float32", width, height); // the matrices are set to float32, so values are in the range of 0-1
	noise_mat = new JitterMatrix("NOISE", 1, "float32", width, height);
	bfgOffset = 0;
	clear(); // set jit.mgraphics to its default state
}

function plot_jit_bfg() {
	clear();
	jit_bfg.message("offset", bfgOffset+=0.1); // increment the x offset
	jit_bfg.message("bang"); // trigger output
	with(mg) {
		move_to(-1, -1);
		for(var x = 0; x < width; x+=10) {
				// plots just the first row of the matrix as the height of the graph
				y = bfg_mat.getcell(x, 0) * height; // scale to height
				set_source_rgb(0, 130/255, 164/255);
				line_to(x, y);
				stroke();
				set_source_rgb(0, 0, 0);
				ellipse(x-2, y-2, 4, 4);
				fill();
				move_to(x, y);
		}
	}
}

function plot_jit_noise() {
	clear();
	jit_noise.message("bang"); // trigger new random values
	with(mg) {
		move_to(-1, -1);
		for(var x = 0; x < width; x+=10) {
				y = noise_mat.getcell(x, 0) * height;
				set_source_rgb(0, 0.5, 0.64);
				line_to(x, y);
				stroke();
				set_source_rgb(0, 0, 0);
				ellipse(x-2, y-2, 4, 4);
				fill();
				move_to(x, y);
		}
	}
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function clear() {
	with(mg) {
		set_source_rgba(bg);
	  paint();
	  set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	  identity_matrix();
	  move_to(0, 0);
	}
}
