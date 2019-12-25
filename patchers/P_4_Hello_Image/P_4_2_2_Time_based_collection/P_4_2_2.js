autowatch = 1;
var { PClone } = require('PClone');
var mg; // jit.mgraphics
var bg = [1, 1, 1, 1]; // background color
var width = 1024;
var height = 1024;

var tileCountX = 12; // take care to consider the aspect ratio, here: 4:3
var tileCountY = 16;
var tileHeight = height/tileCountY; // size of each cell of the grid
var tileWidth = width/tileCountX;
var imageCount = tileCountX*tileCountY; // total number of cells in the grid
var currentImage = 0;
var gridX = 0; //
var gridY = 0;
var finished = false;

var movie; // jit.movie
var frame; // the matrix from which we access the frame
var totalframes = 181;

setup();

function setup() {
	// get jit.mgraphics by it's scripting name
	mg = this.patcher.getnamed("P_4_2_2"); 
	
	// get jit.movie by it's scripting name
	movie = this.patcher.getnamed("mymovie"); 
	
	// access and set the params of the matrix which is storing jit.movie's frames
	frame = new JitterMatrix("frames", 3, "char", tileWidth, tileHeight); 
	clear();
}

function reset() {
	currentImage = 0;
	gridX = 0;
	gridY = 0;
	finished = false;
	// set the current frame back to the start
	movie.message("frame_true", 0);
	// bang causes jit.movie to output,
	// but this method is not always 100% accurate,
	// see the jit.movie help file for details
	movie.message("bang");
	clear();
}

function draw() {
		if(!finished) {
			var moviePos = map(currentImage, 0, imageCount, 0, totalframes);
			jumpToFrame(moviePos);
			var posX = tileWidth * gridX;
			var posY = tileHeight * gridY
			with(mg) {
				// draw the frame within the grid
				for(var y = 0; y < frame.dim[1]; y++) {
					for(var x = 0; x < frame.dim[0]; x++) {
						var col = frame.getcell(x, y);
						set_source_rgb(col[0]/255, col[1]/255, col[2]/255); // mgraphics works with color in the range of 0-1
						rectangle(posX+x, posY+y, 1, 1);
						fill();
					}
				}
			}
			gridX++;
			if (gridX >= tileCountX) {
				gridX = 0;
				gridY++;
			}
		currentImage++;
		if (currentImage > imageCount) finished = true;
	}
}

function jumpToFrame(f) {
	movie.message("frame", f);
	movie.message("bang");
}

function setTotalFrames(n) {
	totalframes = n;
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function clear() {
	with(mg) {
		set_source_rgba(bg);
	  paint();
	  set_source_rgba(0, 0, 0, 1); // default drawing color
	  identity_matrix();
	  move_to(0, 0);
	}
}
