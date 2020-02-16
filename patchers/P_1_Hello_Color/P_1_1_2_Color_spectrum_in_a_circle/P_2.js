autowatch = 1;
var { PClone } = require('PClone');
var mg; // jit.mgraphics
var outputmatrix; // the matrix to store each frame of animation
var pc;
var width = 500;
var height = 500;

var segmentCount;
var radius;

var maxhue;
var maxsaturation;
var maxbrightness;
var saturation;
var brightness;

/*
The color-wheel segements are arranged in the shape of a fan
the vertices are computed from the sin and cos values of the
corresponding angle. The Processing example uses the "TRIANGLE_FAN" mode of
beginShape()but since we don't have that function in mgraphics
a simpler method is to just draw a series of triangles.
*/

setup();

function setup() {
  mg = new JitterObject('jit.mgraphics', width, height);
  outputmatrix = new JitterMatrix(4, 'char', width, height);
  pc = new PClone();
  segmentCount = 360;
  radius = 220;
  maxhue = 360;
  maxsaturation = width;
  maxbrightness = height;
  saturation = maxsaturation;
  brightness = maxbrightness;
}

function draw() {
  background(1, 1, 1, 1);

  mg.set_line_width(1);
  var angleStep = 360 / segmentCount;
  for (var angle = 0; angle < 360; angle += angleStep) {
    var x1 = width / 2 + Math.cos(pc.radians(angle)) * radius;
    var y1 = height / 2 + Math.sin(pc.radians(angle)) * radius;
    var x2 = width / 2 + Math.cos(pc.radians(angle + angleStep)) * radius;
    var y2 = height / 2 + Math.sin(pc.radians(angle + angleStep)) * radius;

    // The example is the book uses HSB (same as HSV)
    // As far as I can tell you can't change the color mode for mgraphics
    // So we work in HSB and then simply convert to RGB before drawing
    var colHSB = [angle / maxhue, saturation / maxsaturation, brightness / maxbrightness, 1];
    // hsba_to_rgba is part of the PClone library.
    var colRGB = pc.hsba_to_rgba(colHSB);
    mg.set_source_rgba(colRGB);
    triangle(x1, y1, x2, y2, width / 2, height / 2);
    mg.fill();
  }
  mg.matrixcalc(outputmatrix, outputmatrix);
  outlet(0, 'jit_matrix', outputmatrix.name);
}

function setSegmentCount(n) {
  segmentCount = n;
}

function setSaturation(s) {
  saturation = s * maxsaturation;
}

function setBrightness(b) {
  brightness = b * maxbrightness;
}

// There are definitely simpler ways writing a triangle function
// but this is the only way I could get the fill() command to work...
function triangle(x1, y1, x2, y2, x3, y3) {
  var vec1 = [x2 - x3, y2 - y3];
  var vec2 = [x1 - x2, y1 - y2];
  with (mg) {
    move_to(x3, y3);
    rel_line_to(vec1[0], vec1[1]);
    rel_line_to(vec2[0], vec2[1]);
    close_path();
  }
}

function background(r, g, b, a) {
  mg.set_source_rgba(r, g, b, a);
  mg.paint();
  mg.set_source_rgba(0, 0, 0, 1);
  mg.identity_matrix();
  mg.move_to(0, 0);
  mg.matrixcalc(outputmatrix, outputmatrix);
}
