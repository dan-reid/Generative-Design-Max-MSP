autowatch = 1;
var { PClone } = require('PClone');

var pc = new PClone();

var u_count = 40;
var u_min = -Math.PI;
var u_max = Math.PI;

var v_count = 60;
var v_min = -Math.PI;
var v_max = Math.PI;

var freq = 5;
var amp = 0.2;

var vertices = new JitterMatrix(3, 'float32', u_count, v_count);

function calc_mesh() {
	for (var iv = 0; iv < v_count; iv++) {
		for (var iu = 0; iu < u_count; iu++) {
			var u = pc.map(iu, 0, u_count, u_min, u_max);
			var v = pc.map(iv, 0, v_count, v_min, v_max);

			var x = u;
			var y = v;
			var z = Math.cos(Math.sqrt(u * u + v * v) * freq) * amp;

			vertices.setcell2d(iu, iv, x / Math.PI, y / Math.PI, z / Math.PI);
		}
	}
	outlet(0, 'jit_matrix', vertices.name);
}
