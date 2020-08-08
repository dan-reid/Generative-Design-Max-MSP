var { isInstanceOfGenerativeDesign } = require('util');

var helperMethods = {
	get_mesh_forms: function () {
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
	},

	create_mesh: function (form, u_count, v_count, u_min, u_max, v_min, v_max) {
		if (isInstanceOfGenerativeDesign(this)) {
			return new GenerativeDesign.Mesh(this, arguments);
		} else {
			return new GenerativeDesign.Mesh(form, u_count, v_count, u_min, u_max, v_min, v_max);
		}
	},
};

exports.helpers = helperMethods;
