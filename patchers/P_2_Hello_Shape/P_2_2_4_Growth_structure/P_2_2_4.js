autowatch = 1;
var { PClone } = require('PClone');
outlets = 2;
var mg;
var output_matrix;
var pc;
var width;
var height;
var x = [];
var y = [];
var r = [];
var finished;
var maxcount = 1000;
var currentcount = 1;

setup();

function setup() {
  width = 500;
  height = 500;
  mg = new JitterObject('jit.mgraphics', width, height);
  output_matrix = new JitterMatrix(4, 'char', width, height);

  // this script uses the PClone.random() and PClone.dist()
  pc = new PClone();
  x = [];
  y = [];
  r = [];
  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
  currentcount = 1;
  finished = false;
}

function draw() {
  if (!finished) {
    background(1, 1, 1, 1);
    var newR = pc.random(1, 7);
    var newX = pc.random(newR, width - newR);
    var newY = pc.random(newR, height - newR);

    var closestDist = 100000000;
    var closestIndex = 0;

    for (var i = 0; i < currentcount; i++) {
      var newDist = pc.dist(newX, newY, x[i], y[i]);
      if (newDist < closestDist) {
        closestDist = newDist;
        closestIndex = i;
      }
    }

    var angle = Math.atan2(newY - y[closestIndex], newX - x[closestIndex]);
    x[currentcount] = x[closestIndex] + Math.cos(angle) * (r[closestIndex] + newR);
    y[currentcount] = y[closestIndex] + Math.sin(angle) * (r[closestIndex] + newR);
    r[currentcount] = newR;
    currentcount++;

    with (mg) {
      for (var i = 0; i < currentcount; i++) {
        set_source_rgba(0, 0, 0, 1);
        ellipse(x[i] - r[i], y[i] - r[i], r[i] * 2, r[i] * 2);
        fill();
      }
    }
    outlet(1, currentcount);

    if (currentcount >= maxcount) finished = true;
  }
  mg.matrixcalc(output_matrix, output_matrix);
  outlet(0, 'jit_matrix', output_matrix.name);
}

function reset() {
  setup();
}

function setmaxcount(n) {
  maxcount = n;
  setup();
}

function background(r, g, b, a) {
  mg.set_source_rgba(r, g, b, a);
  mg.paint();
  mg.set_source_rgba(0, 0, 0, 1); // default drawing colour
  mg.identity_matrix();
  mg.move_to(0, 0);
  mg.matrixcalc(output_matrix, output_matrix);
}
