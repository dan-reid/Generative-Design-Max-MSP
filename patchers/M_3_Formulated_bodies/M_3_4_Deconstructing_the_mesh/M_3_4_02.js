autowatch = 1;
outlets = 3;

var { m4x } = require('m4x');
var { GenerativeDesign } = require('GenerativeDesign');

var gd = new GenerativeDesign();
var m4 = new PClone();

var u_count = 10;
var v_count = 10;
var scale = 1;
var mesh_count = 20;

var seed = 2343;
var form;

function draw_mesh() {
	m4.random_seed(seed);

	for (var i = 0; i < mesh_count; i++) {
		var u_min = m4.random(-6, 6);
		var u_max = u_min + m4.random(2, 3);
		var v_min = m4.random(-6, 6);
		var v_max = v_min + m4.random(1, 2);

		var mesh = gd.create_mesh(form, u_count, v_count, u_min, u_max, v_min, v_max);

		mesh.set_hue_range(192, 192);
		mesh.set_saturation_range(50, 50);
		mesh.set_brightness_range(100, 100);
		mesh.set_alpha(100);
		mesh.set_scale(m4.random(0.9, 1.2));
		mesh.update();
		//my_meshes[i].update_color();

		var vertices = mesh.vertex_matrix();
		var color = mesh.color_matrix();
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
