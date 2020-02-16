autowatch = 1;
outlets = 3;

var { PClone } = require('PClone');
var { GenerativeDesign } = require('GenerativeDesign');

var pc = new PClone();
var my_meshes = [];

var u_count = 10;
var v_count = 10;
var scale = 1;
var mesh_count = 6;

var seed = 2343;
var form;

for (var i = 0; i < mesh_count; i++) {
  my_meshes[i] = new GenerativeDesign.Mesh();
}

function draw_mesh() {
  pc.randomseed(seed);

  for (var i = 0; i < mesh_count; i++) {
    var u_min = pc.random(-6, 6);
    var u_max = u_min + pc.random(2, 3);
    var v_min = pc.random(-6, 6);
    var v_max = v_min + pc.random(1, 2);

    my_meshes[i].set_form(form);
    my_meshes[i].set_u_count(u_count);
    my_meshes[i].set_v_count(v_count);
    my_meshes[i].set_u_range(u_min, u_max);
    my_meshes[i].set_v_range(v_min, v_max);
    my_meshes[i].set_hue_range(192, 192);
    my_meshes[i].set_saturation_range(50, 50);
    my_meshes[i].set_brightness_range(100, 100);
    my_meshes[i].set_alpha(100);
    my_meshes[i].set_scale(pc.random(0.9, 1.2));
    my_meshes[i].update();
    //my_meshes[i].update_color();

    var vertices = my_meshes[i].vertex_matrix();
    var color = my_meshes[i].color_matrix();
    outlet(0, 'target ' + (i + 1)); // sets which instance of jit.gl.mesh to send the matrix to inside poly~
    outlet(1, 'jit_matrix', vertices.name);
    outlet(0, 'target ' + (i + 1));
    outlet(2, 'jit_matrix', color.name);
  }
}

function set_form(f) {
  form = f;
  draw_mesh();
}

function set_scale(s) {
  scale = s;
  draw_mesh();
}

function set_uv_count(u, v) {
  u_count = u;
  v_count = v;
  draw_mesh();
}

function new_random_seed() {
  seed = Math.random() * 100000;
  draw_mesh();
}
