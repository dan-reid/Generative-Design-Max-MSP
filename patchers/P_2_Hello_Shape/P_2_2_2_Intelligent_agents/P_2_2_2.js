autowatch = 1;
var { PClone } = require('PClone');
var mg;
var pc;
var outputmatrix;
var width;
var height;

var north = 0;
var east = 1;
var south = 2;
var west = 3;

var pos_x = 0,
  pos_y = 0;
var x_cross, y_cross;

var direction = south;
var anglecount = 7;
var angle;
var stepsize = 3;
var minlength = 10;

var white = [255, 255, 255, 255];
var speed = 20;

var dweight = 50;
var dstroke = 4;

var drawmode = 3;

setup();

function setup() {
  width = 500;
  height = 500;
  mg = new JitterObject('jit.mgraphics', width, height);
  pc = new PClone();

  angle = get_random_angle(direction);

  outputmatrix = new JitterMatrix(4, 'char', width, height);

  background(1, 1, 1, 1);
}

function draw() {
  for (var i = 0; i < speed; i++) {
    pos_x += Math.cos(pc.radians(angle)) * stepsize;
    pos_y += Math.sin(pc.radians(angle)) * stepsize;

    var reached_border = false;

    if (pos_y <= 5) {
      direction = south;
      reached_border = true;
    } else if (pos_x >= width - 5) {
      direction = west;
      reached_border = true;
    } else if (pos_y >= height - 5) {
      direction = north;
      reached_border = true;
    } else if (pos_x <= 5) {
      direction = east;
      reached_border = true;
    }

    // if the agent is crossing its path or the border is reached
    var px = pc.constrain(Math.floor(pos_x), 0, width - 1);
    var py = pc.constrain(Math.floor(pos_y), 0, height - 1);
    var c = outputmatrix.getcell(px, py);

    if (c[1] != white[1] || reached_border) {
      angle = get_random_angle(direction);
      var distance = pc.dist(pos_x, pos_y, x_cross, y_cross);
      if (distance >= minlength) {
        mg.set_line_width(distance / dweight);
        if (drawmode == 1) {
          mg.set_source_rgb(0, 0, 0);
        } else if (drawmode == 2) {
          var colhsb = [52 / 360, 1, distance / dstroke / 100];
          var colrgb = pc.hsb_to_rgb(colhsb);
          mg.set_source_rgb(colrgb);
        } else if (drawmode == 3) {
          var colhsba = [192 / 360, 1, 64 / 100, distance / dstroke / 100];
          var colrgba = pc.hsba_to_rgba(colhsba);
          mg.set_source_rgba(colrgba);
        }
        mg.move_to(pos_x, pos_y);
        mg.line_to(x_cross, y_cross);
        mg.stroke();
      }
      x_cross = pos_x;
      y_cross = pos_y;
    }
  }

  mg.matrixcalc(outputmatrix, outputmatrix);
  outlet(0, 'jit_matrix', outputmatrix.name);
}

function get_random_angle(dir) {
  var a = ((Math.floor(pc.random(-anglecount, anglecount)) + 0.5) * 90) / anglecount;

  if (dir == north) return a - 90;
  if (dir == east) return a;
  if (dir == south) return a + 90;
  if (dir == west) return a + 180;
  return 0;
}

function set_drawmode(v) {
  drawmode = v;
}

function reset() {
  background(1, 1, 1, 1);
}

function set_speed(v) {
  speed = pc.constrain(v, 1, width);
}

function background(r, g, b, a) {
  mg.set_source_rgba(r, g, b, a);
  mg.paint();
  mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
  mg.identity_matrix();
  mg.move_to(0, 0);
  mg.matrixcalc(outputmatrix, outputmatrix);
}
