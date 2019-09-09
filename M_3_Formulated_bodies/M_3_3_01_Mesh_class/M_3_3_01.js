autowatch = 1;
outlets = 2;

var gd = new GenerativeDesign();


// returns an Array of all mesh forms contained within the class
var forms = gd.get_mesh_forms();

var u_count = 50;
var v_count = 50;

// a range of -PI to PI will draw the full mesh
// ranges less than this will draw segments
var u_min = -Math.PI;
var u_max = Math.PI;
var v_min = -Math.PI;
var v_max = Math.PI;
var form = forms[5];

var mesh = gd.create_mesh(form, u_count, v_count, u_min, u_max, v_min, v_max);
// mesh = GenerativeDesign.Mesh(forms[5], u_count, v_count, u_min, u_max, v_min, v_max);


function output_mesh() {
	// update the vertices
	mesh.update()

	// update the color
	mesh.set_hue_range(185, 185);
	mesh.set_saturation_range(100, 100);
	mesh.set_brightness_range(100, 100);
	// mesh.update_color();

	// returns a JitterMatrix containing the vertex array
	var vertices = mesh.vertex_matrix();

	// returns a JitterMatrix containing the color array
	var colors = mesh.color_matrix();

	outlet(0, "jit_matrix", vertices.name);
	outlet(1, "jit_matrix", colors.name);
}

function set_form(f) {
	form = f;
	mesh.set_form(form);
	output_mesh();
}

function set_u_range(min, max) {
	u_min = min * Math.PI;
	u_max = max * Math.PI;
	mesh.set_u_range(u_min, u_max);
	output_mesh();
}

function set_v_range(min, max) {
	v_min = min * Math.PI;
	v_max = max * Math.PI;
	mesh.set_v_range(v_min, v_max);
	output_mesh();
}

function mesh_scale(s) {
	var scale = s;
	mesh.set_scale(scale);
	output_mesh();
}
