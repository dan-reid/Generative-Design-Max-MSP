var { isInstanceOfGenerativeDesign } = require('util');
var { m4x } = require('m4x');
var m4 = new m4x();

function Mesh() {
	this.form, this.u_count, this.v_count, this.u_min, this.u_max, this.v_min, this.v_max;

	if (isInstanceOfGenerativeDesign(arguments[0])) {
		// save reference to GenerativeDesign if passed in
		this.GenerativeDesign = arguments[0];

		this.form = arguments[1][0] || 'CUSTOM';
		this.u_count = Math.max(arguments[1][1], 2) || 50;
		this.v_count = Math.max(arguments[1][2], 2) || 50;
		this.u_min = arguments[1][3] || -Math.PI;
		this.u_max = arguments[1][4] || Math.PI;
		this.v_min = arguments[1][5] || -Math.PI;
		this.v_max = arguments[1][6] || Math.PI;

		// This is what we'll get with new Mesh()
	} else {
		this.form = arguments[0] || 'CUSTOM';
		this.u_count = Math.max(arguments[1], 2) || 50;
		this.v_count = Math.max(arguments[2], 2) || 50;
		this.u_min = arguments[3] || -Math.PI;
		this.u_max = arguments[4] || Math.PI;
		this.v_min = arguments[5] || -Math.PI;
		this.v_max = arguments[6] || Math.PI;
	}
	// JitterMatrix to store the vertices
	this.points = new JitterMatrix(3, 'float32', this.u_count + 1, this.v_count + 1);
	// JitterMatrix to store the normals
	this.normals;
	// JitterMatrix to store the color
	this.meshcolor = new JitterMatrix(4, 'float32', this.u_count, this.v_count);
	// These can be used to affect the mesh form
	// although in most cases only param[0] is used
	// in the calculation.
	this.params = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	// the scale of the mesh
	this.mesh_scale = 1;

	// params for generating the color matrix
	this.min_hue = 0;
	this.max_hue = 0;
	this.min_saturation = 0;
	this.max_saturation = 0;
	this.min_brightness = 50;
	this.max_brightness = 50;
	this.alpha = 100;

	this._randomseed_ = Math.random() * 1000000;

	this.update();
}

Mesh.prototype.get_forms = function () {
	return [
		'CUSTOM',
		'TUBE',
		'SPHERE',
		'TORUS',
		'PARABOLOID',
		'STEINBACH_SCREW',
		'SINE',
		'FIGURE8TORUS',
		'ELLIPTIC_TORUS',
		'CORKSCREW',
		'BOHEMIAN_DOME',
		'BOW',
		'MAEDERS_OWL',
		'ASTROIDAL_ELLIPSOID',
		'TRIAXIAL_TRITORUS',
		'LIMPET_TORUS',
		'HORN',
		'SHELL',
		'KIDNEY',
		'LEMNISCAPE',
		'SUPERFORMULA',
	];
};

Mesh.prototype.update = function update() {
	this.update_vertices();
	this.update_color();
};

Mesh.prototype.update_vertices = function update_vertices() {
	var u, v;
	var verts;

	for (var iv = 0; iv <= this.v_count; iv++) {
		for (var iu = 0; iu <= this.u_count; iu++) {
			u = m4.map(iu, 0, this.u_count, this.u_min, this.u_max);
			v = m4.map(iv, 0, this.v_count, this.v_min, this.v_max);
			switch (this.form) {
				case 'CUSTOM':
					verts = this.calculate_points(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'TUBE':
					verts = this.Tube(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'SPHERE':
					verts = this.Sphere(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'TORUS':
					verts = this.Torus(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'PARABOLOID':
					verts = this.Paraboloid(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'STEINBACH_SCREW':
					verts = this.Steinbach_Screw(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'SINE':
					verts = this.Sine(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'FIGURE8TORUS':
					verts = this.Figure8Torus(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'ELLIPTIC_TORUS':
					verts = this.Elliptic_Torus(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'CORKSCREW':
					verts = this.Corkscrew(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'BOHEMIAN_DOME':
					verts = this.Bohemian_Dome(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'BOW':
					verts = this.Bow(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'MAEDERS_OWL':
					verts = this.Maeders_Owl(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'ASTROIDAL_ELLIPSOID':
					verts = this.Astroidal_Ellipsoid(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'TRIAXIAL_TRITORUS':
					verts = this.Triaxial_Tritorus(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'LIMPET_TORUS':
					verts = this.Limpet_Torus(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'HORN':
					verts = this.Horn(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'SHELL':
					verts = this.Shell(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'KIDNEY':
					verts = this.Kidney(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'LEMNISCAPE':
					verts = this.Lemniscape(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				case 'SUPERFORMULA':
					verts = this.Superformula(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
					break;
				default:
					verts = this.default_form(u, v);
					this.points.setcell2d(iu, iv, verts[0], verts[1], verts[2]);
			}
		}
	}
	this.points.op('*', this.mesh_scale);
	// this.update_color();
};

Mesh.prototype.update_color = function update_color() {
	this.meshcolor.dim = [this.u_count, this.v_count];

	var minhue = this.min_hue;
	var maxhue = this.max_hue;
	if (Math.abs(maxhue - minhue) < 20) maxhue = minhue;

	var minsat = this.min_saturation;
	var maxsat = this.max_saturation;
	if (Math.abs(maxsat - minsat) < 10) maxsat = minsat;

	var minbri = this.min_brightness;
	var maxbri = this.max_brightness;
	if (Math.abs(maxbri - minbri) < 10) maxbri = minbri;

	var randomrange = function (max, min) {
		return Math.random() * (max - min) + min;
	};

	for (var y = 0; y < this.meshcolor.dim[1]; y++) {
		for (var x = 0; x < this.meshcolor.dim[0]; x++) {
			var HSBA = [randomrange(minhue, maxhue), randomrange(minsat, maxsat), randomrange(minbri, maxbri), this.alpha];
			// var HSBA = [1, 2, 3, 4];
			this.meshcolor.setcell2d(x, y, HSBA[0] / 360, HSBA[1] / 100, HSBA[2] / 100, HSBA[3] / 100);
			// this.meshcolor.setcell2d(x, y, HSBA[0], HSBA[1], HSBA[2], HSBA[3]);
		}
	}
};

Mesh.prototype.calculate_points = function calculate_points(u, v) {
	var x = u;
	var y = v;
	var z = 0;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.default_form = function default_form(u, v) {
	var x = u;
	var y = v;
	var z = 0;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Tube = function Tube(u, v) {
	var x = Math.sin(u);
	var y = this.params[0] * v;
	var z = Math.cos(u);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Sphere = function Sphere(u, v) {
	v /= 2;
	v += Math.PI / 2;
	var x = 2 * (Math.sin(v) * Math.sin(u));
	var y = 2 * (this.params[0] * Math.cos(v));
	var z = 2 * (Math.sin(v) * Math.cos(u));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Torus = function Torus(u, v) {
	var x = 1 * ((this.params[1] + 1 + this.params[0] * Math.cos(v)) * Math.sin(u));
	var y = 1 * (this.params[0] * Math.sin(v));
	var z = 1 * ((this.params[1] + 1 + this.params[0] * Math.cos(v)) * Math.cos(u));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Paraboloid = function Paraboloid(u, v) {
	var pd = this.params[0];
	if (pd == 0) pd = 0.0001;

	var x = this.power(v / pd, 0.5) * Math.sin(u);
	var y = v;
	var z = this.power(v / pd, 0.5) * Math.cos(u);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Steinbach_Screw = function Steinbach_Screw(u, v) {
	var x = u * Math.cos(v);
	var y = u * Math.sin(this.params[0] * v);
	var z = v * Math.cos(u);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Sine = function Sine(u, v) {
	var x = 2 * Math.sin(u);
	var y = 2 * Math.sin(this.params[0] * v);
	var z = 2 * Math.sin(u + v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Figure8Torus = function Figure8Torus(u, v) {
	var x = 1.5 * Math.cos(u) * (this.params[0] + Math.sin(v) * Math.cos(u) - (Math.sin(2 * v) * Math.sin(u)) / 2);
	var y = 1.5 * Math.sin(u) * (this.params[0] + Math.sin(v) * Math.cos(u) - (Math.sin(2 * v) * Math.sin(u)) / 2);
	var z = 1.5 * Math.sin(u) * Math.sin(v) + (Math.cos(u) * Math.sin(2 * v)) / 2;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Elliptic_Torus = function Elliptic_Torus(u, v) {
	var x = 1.5 * (this.params[0] + Math.cos(v)) * Math.cos(u);
	var y = 1.5 * (this.params[0] + Math.cos(v)) * Math.sin(u);
	var z = 1.5 * Math.sin(v) + Math.cos(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Corkscrew = function Corkscrew(u, v) {
	var x = Math.cos(u) * Math.cos(v);
	var y = Math.sin(u) * Math.cos(v);
	var z = Math.sin(v) + this.params[0] * u;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Bohemian_Dome = function Bohemian_Dome(u, v) {
	var x = 2 * Math.cos(u);
	var y = 2 * Math.sin(u) + this.params[0] * Math.cos(v);
	var z = 2 * Math.sin(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Bow = function Bow(u, v) {
	u /= constants.TWO_PI;
	v /= constants.TWO_PI;
	var x = (2 + this.params[0] * Math.sin(constants.TWO_PI * u)) * Math.sin(2 * constants.TWO_PI * v);
	var y = (2 + this.params[0] * Math.sin(constants.TWO_PI * u)) * Math.cos(2 * constants.TWO_PI * v);
	var z = this.params[0] * Math.cos(constants.TWO_PI * u) + 3 * Math.cos(constants.TWO_PI * v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Maeders_Owl = function Maeders_Owl(u, v) {
	var x = 0.4 * (v * Math.cos(u) - 0.5 * this.params[0] * this.power(v, 2) * Math.cos(2 * u));
	var y = 0.4 * (-v * Math.sin(u) - 0.5 * this.params[0] * this.power(v, 2) * Math.sin(2 * u));
	var z = 0.4 * ((4 * this.power(v, 1.5) * Math.cos((3 * u) / 2)) / 3);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Astroidal_Ellipsoid = function Astroidal_Ellipsoid(u, v) {
	u /= 2;
	var x = 3 * this.power(Math.cos(u) * Math.cos(v), 3 * this.params[0]);
	var y = 3 * this.power(Math.sin(u) * Math.cos(v), 3 * this.params[0]);
	var z = 3 * this.power(Math.sin(v), 3 * this.params[0]);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Triaxial_Tritorus = function Triaxial_Tritorus(u, v) {
	var x = 1.5 * Math.sin(u) * (1 + Math.cos(v));
	var y = 1.5 * Math.sin(u + (constants.TWO_PI / 3) * this.params[0]) * (1 + Math.cos(v + (constants.TWO_PI / 3) * this.params[0]));
	var z = 1.5 * Math.sin(u + ((constants.TWO_PI * 2) / 3) * this.params[0]) * (1 + Math.cos(v + (constants.TWO_PI / 3) * this.params[0]));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Limpet_Torus = function Limpet_Torus(u, v) {
	var x = (1.5 * this.params[0] * Math.cos(u)) / (Math.sqrt(2) + Math.sin(v));
	var y = (1.5 * this.params[0] * Math.sin(u)) / (Math.sqrt(2) + Math.sin(v));
	var z = (1.5 * 1) / (Math.sqrt(2) + Math.cos(v));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Horn = function Horn(u, v) {
	u /= Math.PI;
	// v /= Math.PI;
	var x = (2 * this.params[0] + u * Math.cos(v)) * Math.sin(Math.PI * 2 * u);
	var y = (2 * this.params[0] + u * Math.cos(v)) * Math.cos(Math.PI * 2 * u) + 2 * u;
	var z = u * Math.sin(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Shell = function Shell(u, v) {
	var x = this.params[1] * (1 - u / (Math.PI * 2)) * Math.cos(this.params[0] * u) * (1 + Math.cos(v)) + this.params[3] * Math.cos(this.params[0] * u);
	var y = this.params[1] * (1 - u / (Math.PI * 2)) * Math.sin(this.params[0] * u) * (1 + Math.cos(v)) + this.params[3] * Math.sin(this.params[0] * u);
	var z = this.params[2] * (u / (Math.PI * 2)) + this.params[0] * (1 - u / (Math.PI * 2)) * Math.sin(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Kidney = function Kidney(u, v) {
	u /= 2;
	var x = Math.cos(u) * (this.params[0] * 3 * Math.cos(v) - Math.cos(3 * v));
	var y = Math.sin(u) * (this.params[0] * 3 * Math.cos(v) - Math.cos(3 * v));
	var z = 3 * Math.sin(v) - Math.sin(3 * v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Lemniscape = function Lemniscape(u, v) {
	u /= 2;
	var conv_sqrt_abs_sin_2u = Math.cos(v) * Math.sqrt(Math.abs(Math.sin(2 * this.params[0] * u)));
	var x = conv_sqrt_abs_sin_2u * Math.cos(u);
	var y = conv_sqrt_abs_sin_2u * Math.sin(u);
	var z = 3 * (this.power(x, 2) - this.power(y, 2) + 2 * x * y * this.power(Math.tan(v), 2));
	x *= 3;
	y *= 3;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

Mesh.prototype.Superformula = function Superformula(u, v) {
	v /= 2;

	// Superformel 1
	var a = this.params[0];
	var b = this.params[1];
	var m = this.params[2];
	var n1 = this.params[3];
	var n2 = this.params[4];
	var n3 = this.params[5];
	var r1 = Math.pow(Math.pow(Math.abs(Math.cos((m * u) / 4) / a), n2) + Math.pow(Math.abs(Math.sin((m * u) / 4) / b), n3), -1 / n1);

	// Superformel 2
	a = this.params[6];
	b = this.params[7];
	m = this.params[8];
	n1 = this.params[9];
	n2 = this.params[10];
	n3 = this.params[11];
	var r2 = Math.pow(Math.pow(Math.abs(Math.cos((m * v) / 4) / a), n2) + Math.pow(Math.abs(Math.sin((m * v) / 4) / b), n3), -1 / n1);

	var x = 2 * (r1 * Math.sin(u) * r2 * Math.cos(v));
	var y = 2 * (r2 * Math.sin(v));
	var z = 2 * (r1 * Math.cos(u) * r2 * Math.cos(v));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

// scales the mesh without having to call update
Mesh.prototype.scale = function scale(scale) {
	this.mesh_scale = scale;
	this.update();
};

// calculates the surface normals
Mesh.prototype.calculate_noramals = function (source) {
	// todo...
};

// get methods for returning the current values for each param
Mesh.prototype.get_form = function get_form() {
	return this.form;
};

Mesh.prototype.get_u_count = function get_u_count() {
	return this.u_count;
};

Mesh.prototype.get_v_count = function get_v_count() {
	return this.v_count;
};

Mesh.prototype.get_u_range = function get_u_range() {
	return [this.u_min, this.u_max];
};

Mesh.prototype.get_v_range = function get_v_range() {
	return [this.v_min, this.v_max];
};

Mesh.prototype.get_hue_range = function get_hue_range() {
	return [this.min_hue, this.max_hue];
};

Mesh.prototype.get_saturation_range = function get_saturation_range() {
	return [this.min_saturation, this.max_saturation];
};

Mesh.prototype.get_brightness_range = function get_brightness_range() {
	return [this.min_brightness, this.max_brightness];
};

Mesh.prototype.get_alpha = function get_alpha() {
	return this.alpha;
};

// set methods are setting params
Mesh.prototype.set_hue_range = function set_hue_range(min, max) {
	this.min_hue = min;
	this.max_hue = max;
};

Mesh.prototype.set_saturation_range = function set_saturation_range(min, max) {
	this.min_saturation = min;
	this.max_saturation = max;
};

Mesh.prototype.set_brightness_range = function set_brightness_range(min, max) {
	this.min_brightness = min;
	this.max_brightness = max;
};

Mesh.prototype.set_alpha = function set_alpha(a) {
	this.alpha = a;
};

Mesh.prototype.set_form = function set_form(form) {
	this.form = form;
};

Mesh.prototype.set_u_count = function set_u_count(u) {
	this.u_count = u;
};

Mesh.prototype.set_v_count = function set_v_count(v) {
	this.v_count = v;
};

Mesh.prototype.set_u_range = function set_u_range(min, max) {
	this.u_min = min;
	this.u_max = max;
};

Mesh.prototype.set_v_range = function set_v_range(min, max) {
	this.v_min = min;
	this.v_max = max;
};

Mesh.prototype.set_params = function set_params() {
	var num_args = arguments.length;

	if (num_args > this.params.length) {
		num_args = this.params.length;
	}

	for (var i = 0; i < num_args; i++) {
		this.params[i] = arguments[i];
	}
};

Mesh.prototype.set_scale = function set_scale(scale) {
	this.mesh_scale = scale;
};

Mesh.prototype.power = function (b, e) {
	if (b >= 0 || Math.floor(e) == e) {
		return Math.pow(b, e);
	} else {
		return -Math.pow(-b, e);
	}
};

Mesh.prototype.color_matrix = function color_matrix() {
	return this.meshcolor;
};

Mesh.prototype.normals_matrix = function normals_matrix() {
	//todo..
};

Mesh.prototype.vertex_matrix = function vertex_matrix() {
	return this.points;
};

exports.Mesh = Mesh;
