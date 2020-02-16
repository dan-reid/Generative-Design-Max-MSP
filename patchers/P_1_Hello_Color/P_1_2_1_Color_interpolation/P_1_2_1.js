autowatch = 1;
var { PClone } = require('PClone');
var mg;
var mgmatrix;
var pc;
var width;
var height;
var tilecount_x;
var tilecount_y;
var colors_left = [];
var colors_right = [];
var max_hue;
var max_saturation;
var max_brightness;

setup();

function setup() {
  width = 500;
  height = 500;
  mg = new JitterObject('jit.mgraphics', width, height);
  mgmatrix = new JitterMatrix(4, 'char', width, height);
  pc = new PClone();
  tilecount_x = 10;
  tilecount_y = 10;

  max_hue = 360;
  max_saturation = 100;
  max_brightness = 100;

  shakecolors();
}

function draw() {
  background(1, 1, 1, 1);
  var tilewidth = width / tilecount_x;
  var tileheight = height / tilecount_y;

  for (var y = 0; y < tilecount_y; y++) {
    var col1 = colors_left[y];
    var col2 = colors_right[y];
    for (var x = 0; x < tilecount_x; x++) {
      var posX = tilewidth * x;
      var posY = tileheight * y;
      var amount = pc.map(x, 0, tilecount_x - 1, 0, 1);
      var interp_col_HSBA = lerpcolor(col1, col2, amount);
      var interp_col_HSBA_norm = [
        interp_col_HSBA.channels[0] / max_hue,
        interp_col_HSBA.channels[1] / max_saturation,
        interp_col_HSBA.channels[2] / max_brightness,
        1,
      ];
      var interp_col_RGBA = pc.hsba_to_rgba(interp_col_HSBA_norm);
      mg.set_source_rgba(interp_col_RGBA);

      mg.rectangle(posX, posY, tilewidth, tileheight);
      mg.fill();
    }
  }
  mg.matrixcalc(mgmatrix, mgmatrix);
  outlet(0, 'jit_matrix', mgmatrix.name);
}

function background(r, g, b, a) {
  mg.set_source_rgba(r, g, b, a);
  mg.paint();
  mg.set_source_rgba(0, 0, 0, 1);
  mg.identity_matrix();
  mg.move_to(0, 0);
  mg.matrixcalc(mgmatrix, mgmatrix);
}

function shakecolors() {
  for (var i = 0; i < tilecount_y; i++) {
    colors_left[i] = new Color(pc.random(0, 60), pc.random(0, 100), 100, 255);
    colors_right[i] = new Color(pc.random(160, 190), 100, pc.random(0, 100), 255);
  }
}

function Color(chnl1, chnl2, chnl3, chnl4) {
  this.channels = [chnl1, chnl2, chnl3, chnl4];
}

function setGridXY(x, y) {
  tilecount_x = x;
  tilecount_y = y;
}

function lerpcolor(c1, c2, a) {
  var col1 = c1.channels;
  var col2 = c2.channels;
  var c = new Color(
    pc.lerp(col1[0], col2[0], a),
    pc.lerp(col1[1], col2[1], a),
    pc.lerp(col1[2], col2[2], a),
    255
  );
  return c;
}
