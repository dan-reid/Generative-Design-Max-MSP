autowatch = 1;
var { PClone } = require('PClone');
var mg;
var pc;
var outputmatrix;
var width;
var height;
var mouse_x = 360;
var mouse_y = 360;

setup();

function setup() {
  width = 720;
  height = 720;
  // jit.mgraphics
  mg = new JitterObject('jit.mgraphics', width, height);
  // the matrix to store and display jit.mgraphics's output
  outputmatrix = new JitterMatrix(4, 'char', width, height);
  pc = new PClone();
  pc.set_color_mode('HSB', 360, 100, 100, 100);
}

function draw() {
  var bg_col = pc.color(mouse_y / 2, 100, 100, 100);
  background(bg_col.normalize().to_rgb());

  var fg_col = pc.color(360 - mouse_y / 2, 100, 100, 100);
  mg.set_source_rgb(fg_col.normalize().to_rgb());

  mg.rectangle(360 - (mouse_x + 1) / 2, 360 - (mouse_x + 1) / 2, mouse_x + 1, mouse_x + 1);
  mg.fill();

  // this should always be last in the draw function
  mg.matrixcalc(outputmatrix, outputmatrix);
  outlet(0, 'jit_matrix', outputmatrix.name);
}

function mousemoved(x, y) {
  mouse_x = x;
  mouse_y = y;
}

function background(c) {
  mg.set_source_rgba(c);
  mg.paint();
  mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill bg_color
  mg.identity_matrix();
  mg.move_to(0, 0);
  mg.matrixcalc(outputmatrix, outputmatrix);
}
