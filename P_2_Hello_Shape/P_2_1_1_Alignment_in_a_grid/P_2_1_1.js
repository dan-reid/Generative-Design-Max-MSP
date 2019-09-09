autowatch = 1;
var mg;
var pc;
var outputmatrix;
var width = 500;
var height = 500;

var tilecount;
var tilewidth;
var tileheight;
var seed = 40;
var stroke_weight_R = 10;
var stroke_weight_L = 10;
var linecap = "square";
var color_left =  [0, 0, 0, 1];
var color_right = [0., 0.65, 0.87, 1.];

setup();

function setup() {
  width = 500;
  height = 500;
  mg = new JitterObject("jit.mgraphics", width, height);
  outputmatrix = new JitterMatrix(4 , "char", width, height);
  // this script uses PClone.random()
  pc = new PClone();
  tilecount = 20;
  tilewidth = width/tilecount;
  tileheight = height/tilecount;
}

function draw() {
  background(1, 1, 1, 1);
  pc.randomseed(seed);

  with(mg) {
    set_source_rgba(0, 0, 0, 1);
    set_line_width(2);
    set_line_cap(linecap);

    for (var y = 0; y < tilecount; y++) {
      for(var x = 0; x < tilecount; x++) {
        var posX = Math.floor(tilewidth)*x;
        var posY = Math.floor(tileheight)*y;

        // creates a random number between 0. - 1.999.
        // Math.floor rounds the value to either 0 or 1;
        var toggle = Math.floor(pc.random(2));

        // within each cell of the grid...
        // if toggle = 0 a line is drawn from the upper-left to the lower-right corner.
        // if toggle = 1 a line is drawn from the lower-left to the upper-right corner.
        if(toggle == 0) {
          set_source_rgba(color_left);
          set_line_width(stroke_weight_L);
          move_to(posX, posY);
          line_to(posX+tilewidth, posY+tileheight);
          stroke();
        }
        if(toggle == 1) {
          set_source_rgba(color_right);
          set_line_width(stroke_weight_R);
          move_to(posX, posY+tilewidth);
          line_to(posX+tileheight, posY);
          stroke();
        }
      }
    }
  }
  mg.matrixcalc(outputmatrix, outputmatrix);
  outlet(0, "jit_matrix", outputmatrix.name);
}

function new_seed() {
  seed = Math.floor(Math.random()*100000);
}

function background(r, g, b, a) {
	  mg.set_source_rgba(r, g, b, a);
  	mg.paint();
  	mg.set_source_rgba(0, 0, 0, 255);
  	mg.identity_matrix();
  	mg.move_to(0, 0);
    mg.matrixcalc(outputmatrix, outputmatrix);
}

function set_color_left(r, g, b, a) {
  color_left = [r, g, b, a];
}

function set_color_right(r, g, b, a) {
  color_right = [r, g, b, a];
}

function set_line_cap(s) {
  linecap = s;
}

function set_stroke_weights(l, r) {
  stroke_weight_L = l;
  stroke_weight_R = r;
}
