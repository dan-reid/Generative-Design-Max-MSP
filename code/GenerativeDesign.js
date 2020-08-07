var { PClone } = require('PClone');
var { constants } = require('constants');

var pclone = new PClone();

function GenerativeDesign() {}

GenerativeDesign.prototype.usePClone = function () {
	var val = this.pclone.random(0, 10);
	post('random val: ' + val);
};

/*
The Treemap class has just been pretty much copy and pasted from
the p5js Generative Design library except for some minor changes:

1: Functions specific to the p5js library have been replaced with native javascript

2: The Array.findIndex method has been replaced with code to mimic its function
   as it's not supported in the version of js used in max.

3: The draw method has been removed as it's more straightforward to draw
   the treemap from the main script in our case. Besides, this is how it's done in
   the p5js example.

4: Method names have been edited to fit the naming conventions in max
*/

GenerativeDesign.Treemap = function Treemap() {
	this.parent;
	this.data;
	this.count = 0;
	this.items = [];

	/**
	 * x position of the rectangle.
	 */
	this.x = 0;
	/**
	 * y position of the rectangle.
	 */
	this.y = 0;
	/**
	 * width of the rectangle.
	 */
	this.w = 0;
	/**
	 * height of the rectangle.
	 */
	this.h = 0;
	this.options;

	if (arguments.length >= 4) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.w = arguments[2];
		this.h = arguments[3];
		this.options = arguments[4];
	} else {
		this.parent = arguments[0];
		this.data = arguments[1];
		this.count = arguments[2] || 0;
	}

	this.x = this.x || 0;
	this.y = this.y || 0;
	this.w = this.w || 0;
	this.h = this.h || 0;

	/**
	 * the minimum count value of the items in the items array
	 */
	this.minCount = 0;
	/**
	 * the maximum count value of the items in the items array
	 */
	this.maxCount = 0;

	/**
	 * level of the item; the root node has level 0
	 */
	if (this.parent) this.level = this.parent.level + 1;
	else this.level = 0;

	/**
	 * the depth of the branch; end nodes have depth 0
	 */
	this.depth = 0;

	/**
	 * the number of items in the complete branch
	 */
	this.itemCount = 1;

	/**
	 * index of the item in the sorted items array..
	 */
	this.index = 0;

	this.root = this;
	this.isRoot = true;
	if (this.parent) {
		this.root = this.parent.root;
		this.isRoot = false;
	}
	this.options = this.options || this.root.options;

	this.ignored = false;
};

/**
 * Adds data to the Treemap. If you give just one parameter, this value will be added to the items array.
 * If there is already an item which has this value as data, just increase the counter of that item.
 * If not, create a new Treemap with that data and init the counter with 1.
 * If you have a complex object or array of nested subitems, you can give a second parameter,
 * which defines what keys should be used to build the Treemap. This second parameter is in the form
 * {children:"items", count:"size", data:"name"}.
 * The key 'children' defines, where to find the nested arrays. If you have a plain nested array, just leave this out.
 * The key 'count' defines, which value to map to the size of the rectangles of the Treemap.
 * The key 'data' defines, which data to store. If omitted, the complete object or array branch is stored.
 * This might be the way to choose in most cases. That way you keep all the information accessible when drawing the treemap.
 *
 *
 * the data element (e.g. a String)
 * which keys should be used to build the Treemap: e.g. {children:"items", count:"size", data:"name"}. See the example for different ways how to use that.
 * returns true, if a new treemap was created
 */

GenerativeDesign.Treemap.prototype.add_data = function (data, keys) {
	if (keys) {
		// store data. If a key is given, just store that part of the object, otherwise the whole branch.
		if (keys.data) this.data = data[keys.data];
		else this.data = data;

		// store counter. if data is a number, just use that as a counter. if data is an object, store what's given at the key 'count'.
		if (typeof data === 'number') this.count = data;
		else this.count = data[keys.count] || 0;

		// get children. if the key 'children' is defined use that. otherwise data might be just an array, so use it directly.
		var children = data;
		if (keys.children) children = data[keys.children];

		if (children instanceof Array) {
			children.forEach(
				function (child) {
					var t = new Treemap(this);
					this.items.push(t);
					t.add_data(child, keys);
				}.bind(this)
			);
			return true;
		}
		return false;
	} else {
		// data is a "simple" value (String, Number, small Object or Array) which should be counted.

		// the version of js used in max doesn't support Array.findIndex()
		// so the for loop below is a work around.
		var idx = -1;
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].data == data) {
				idx = i;
				break;
			}
		}
		if (idx >= 0) {
			// the element is already in this Treemap, so just increase counter
			this.items[idx].count++;
			return false;
		} else {
			// the element is not found, so create a new Treemap for it
			this.items.push(new GenerativeDesign.Treemap(this, data, 1));
		}
		return true;
	}
};

/**
 * Adds an empty treemap to this treemap. If data is given, this could be used
 * to show and hide a complete sub-treemap from the diagram. There is no check,
 * if there is already another treemap with that data.
 *
 * add_treemap
 * the data element (e.g. a String)
 * the initial counter
 * returns the new Treemap
 */
GenerativeDesign.Treemap.prototype.add_treemap = function (data, count) {
	var t = new Treemap(this, data, count);
	this.items.push(t);
	return t;
};

// The size of a rectangle depends on the counter. So it's important to sum
// up all the counters recursively. Only called internally.
GenerativeDesign.Treemap.prototype.sum_up_counters = function () {
	// Adjust parameter this.ignore: if ignore option is defined and this.data is listed in that ignored=true
	if (this.options.ignore instanceof Array) {
		if (this.options.ignore.indexOf(this.data) >= 0) {
			this.ignored = true;
		} else {
			this.ignored = false;
		}
	}

	// return count or 0 depending on this.ignored
	if (this.items.length == 0) {
		if (this.ignored) return 0;
	} else {
		this.minCount = Number.MAX_VALUE;
		this.maxCount = 0;
		this.depth = 0;
		this.itemCount = 1;
		this.count = 0;

		if (this.ignored) return 0;

		for (var i = 0; i < this.items.length; i++) {
			var sum = this.items[i].sum_up_counters();
			this.count += sum;
			this.minCount = Math.min(this.minCount, sum);
			this.maxCount = Math.max(this.maxCount, sum);
			this.depth = Math.max(this.depth, this.items[i].depth + 1);
			this.itemCount += this.items[i].itemCount;
		}
	}
	return this.count;
};

/**
 * Calculates the rectangles of each item. While doing this, all counters
 * and ignore flags are updated.
 */
GenerativeDesign.Treemap.prototype.calculate = function () {
	// Stop immediately, if it's an empty array
	if (this.items.length == 0) return;

	// if it's the root node, sum up all counters recursively
	if (this == this.root) this.sum_up_counters();

	// If to ignore this element, adjust parameters and stop
	if (this.ignored) {
		this.x = -100000; // just a value far outside the screen, so it won't show up if it's drawn accidentally
		this.y = 0;
		this.w = 0;
		this.h = 0;
		return;
	}

	// sort or shuffle according to the given option
	if (this.options.sort == true || this.options.sort == undefined) {
		// sort items
		this.items.sort(function (a, b) {
			if (a.count < b.count) return 1;
			if (a.count > b.count) return -1;
			else return 0;
		});
	} else {
		// shuffle explicitly
		this._shuffle_array(this.items);
	}

	// give every child an index. could be handy for drawing
	for (var i = 0; i < this.items.length; i++) {
		this.items[i].index = i;
	}

	// Starting point is a rectangle and a number of counters to fit in.
	// So, as nothing has fit in the rect, restSum, restW, ... are the starting rect and the sum of all counters
	var restSum = this.count;
	var pad = this.options.padding || 0;
	var restX = this.x + pad;
	var restY = this.y + pad;
	var restW = this.w - pad * 2;
	var restH = this.h - pad * 2;

	// Fit in rows. One row consits of one or more rects that should be as square as possible in average.
	// actIndex always points on the first counter, that has not fitted in.
	var actIndex = 0;
	while (actIndex < this.items.length) {
		// A row is always along the shorter edge (a).
		var isHorizontal = true; // horizontal row
		var a = restW;
		var b = restH;
		if (this.options.direction != 'horizontal') {
			if (restW > restH || this.options.direction == 'vertical') {
				isHorizontal = false; // vertical row
				a = restH;
				b = restW;
			}
		}

		// How many items to fit into the row?
		var rowSum = 0;
		var rowCount = 0;
		var avRelPrev = Number.MAX_VALUE;
		for (var i = actIndex; i < this.items.length; i++) {
			rowSum += this.items[i].count;
			rowCount++;

			// a * bLen is the rect of the row
			var percentage = rowSum / restSum;
			var bLen = b * percentage;
			var avRel = a / rowCount / bLen;

			// Let's assume it's a horizontal row. The rects are as square as possible,
			// as soon as the average width (a / rowCount) gets smaller than the row height (bLen).
			if (avRel < 1 || i == this.items.length - 1) {
				// Which is better, the actual or the previous fitting?
				if (avRelPrev < 1 / avRel) {
					// previous fitting is better, so revert to that
					rowSum -= this.items[i].count;
					rowCount--;
					bLen = (b * rowSum) / restSum;
					i--;
				}

				// get the position and length of the row according to isHorizontal (horizontal or not).
				var aPos = restX;
				var bPos = restY;
				var aLen = restW;
				if (!isHorizontal) {
					aPos = restY;
					bPos = restX;
					aLen = restH;
				}

				// now we can transform the counters between index actIndex and i to rects (in fact to treemaps)
				for (var j = actIndex; j <= i; j++) {
					// map aLen according to the value of the counter
					var aPart = (aLen * this.items[j].count) / rowSum;
					if (isHorizontal) {
						this.items[j].x = aPos;
						this.items[j].y = bPos;
						this.items[j].w = aPart;
						this.items[j].h = bLen;
					} else {
						this.items[j].x = bPos;
						this.items[j].y = aPos;
						this.items[j].w = bLen;
						this.items[j].h = aPart;
					}
					// negative width or height not allowed
					this.items[j].w = Math.max(this.items[j].w, 0);
					this.items[j].h = Math.max(this.items[j].h, 0);

					// now that the position, width and height is set, it's possible to calculate the nested treemap.
					this.items[j].calculate();
					aPos += aPart;
				}

				// adjust dimensions for the next row
				if (isHorizontal) {
					restY += bLen;
					restH -= bLen;
				} else {
					restX += bLen;
					restW -= bLen;
				}
				restSum -= rowSum;

				break;
			}

			avRelPrev = avRel;
		}

		actIndex = i + 1;
	}
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
GenerativeDesign.Treemap.prototype._shuffle_array = function (array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

GenerativeDesign.prototype.get_mesh_forms = function () {
	var forms = [
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
	return forms;
};

GenerativeDesign.prototype.create_mesh = function (form, u_count, v_count, u_min, u_max, v_min, v_max) {
	if (this instanceof GenerativeDesign) {
		return new GenerativeDesign.Mesh(this, arguments);
	} else {
		return new GenerativeDesign.Mesh(form, u_count, v_count, u_min, u_max, v_min, v_max);
	}
};

GenerativeDesign.Mesh = function Mesh() {
	var form, u_count, v_count, u_min, u_max, v_min, v_max;

	this.form, this.u_count, this.v_count, this.u_min, this.u_max, this.v_min, this.v_max;

	if (arguments[0] instanceof GenerativeDesign) {
		// save reference to GenerativeDesign if passed in
		this.GenerativeDesign = arguments[0];

		this.form = arguments[1][0] || 'CUSTOM';
		this.u_count = Math.max(arguments[1][1], 2) || 50;
		this.v_count = Math.max(arguments[1][2], 2) || 50;
		this.u_min = arguments[1][3] || -Math.PI;
		this.u_max = arguments[1][4] || Math.PI;
		this.v_min = arguments[1][5] || -Math.PI;
		this.v_max = arguments[1][6] || Math.PI;

		// This is what we'll get with new GenerativeDesign.Mesh()
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
};

GenerativeDesign.Mesh.prototype.update = function update() {
	this.update_vertices();
	this.update_color();
};

GenerativeDesign.Mesh.prototype.update_vertices = function update_vertices() {
	var u, v;
	var verts;

	for (var iv = 0; iv <= this.v_count; iv++) {
		for (var iu = 0; iu <= this.u_count; iu++) {
			u = pclone.map(iu, 0, this.u_count, this.u_min, this.u_max);
			v = pclone.map(iv, 0, this.v_count, this.v_min, this.v_max);
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

GenerativeDesign.Mesh.prototype.update_color = function update_color() {
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

GenerativeDesign.Mesh.prototype.calculate_points = function calculate_points(u, v) {
	var x = u;
	var y = v;
	var z = 0;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.default_form = function default_form(u, v) {
	var x = u;
	var y = v;
	var z = 0;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Tube = function Tube(u, v) {
	var x = Math.sin(u);
	var y = this.params[0] * v;
	var z = Math.cos(u);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Sphere = function Sphere(u, v) {
	v /= 2;
	v += Math.PI / 2;
	var x = 2 * (Math.sin(v) * Math.sin(u));
	var y = 2 * (this.params[0] * Math.cos(v));
	var z = 2 * (Math.sin(v) * Math.cos(u));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Torus = function Torus(u, v) {
	var x = 1 * ((this.params[1] + 1 + this.params[0] * Math.cos(v)) * Math.sin(u));
	var y = 1 * (this.params[0] * Math.sin(v));
	var z = 1 * ((this.params[1] + 1 + this.params[0] * Math.cos(v)) * Math.cos(u));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Paraboloid = function Paraboloid(u, v) {
	var pd = this.params[0];
	if (pd == 0) pd = 0.0001;

	var x = this.power(v / pd, 0.5) * Math.sin(u);
	var y = v;
	var z = this.power(v / pd, 0.5) * Math.cos(u);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Steinbach_Screw = function Steinbach_Screw(u, v) {
	var x = u * Math.cos(v);
	var y = u * Math.sin(this.params[0] * v);
	var z = v * Math.cos(u);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Sine = function Sine(u, v) {
	var x = 2 * Math.sin(u);
	var y = 2 * Math.sin(this.params[0] * v);
	var z = 2 * Math.sin(u + v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Figure8Torus = function Figure8Torus(u, v) {
	var x = 1.5 * Math.cos(u) * (this.params[0] + Math.sin(v) * Math.cos(u) - (Math.sin(2 * v) * Math.sin(u)) / 2);
	var y = 1.5 * Math.sin(u) * (this.params[0] + Math.sin(v) * Math.cos(u) - (Math.sin(2 * v) * Math.sin(u)) / 2);
	var z = 1.5 * Math.sin(u) * Math.sin(v) + (Math.cos(u) * Math.sin(2 * v)) / 2;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Elliptic_Torus = function Elliptic_Torus(u, v) {
	var x = 1.5 * (this.params[0] + Math.cos(v)) * Math.cos(u);
	var y = 1.5 * (this.params[0] + Math.cos(v)) * Math.sin(u);
	var z = 1.5 * Math.sin(v) + Math.cos(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Corkscrew = function Corkscrew(u, v) {
	var x = Math.cos(u) * Math.cos(v);
	var y = Math.sin(u) * Math.cos(v);
	var z = Math.sin(v) + this.params[0] * u;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Bohemian_Dome = function Bohemian_Dome(u, v) {
	var x = 2 * Math.cos(u);
	var y = 2 * Math.sin(u) + this.params[0] * Math.cos(v);
	var z = 2 * Math.sin(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Bow = function Bow(u, v) {
	u /= constants.TWO_PI;
	v /= constants.TWO_PI;
	var x = (2 + this.params[0] * Math.sin(constants.TWO_PI * u)) * Math.sin(2 * constants.TWO_PI * v);
	var y = (2 + this.params[0] * Math.sin(constants.TWO_PI * u)) * Math.cos(2 * constants.TWO_PI * v);
	var z = this.params[0] * Math.cos(constants.TWO_PI * u) + 3 * Math.cos(constants.TWO_PI * v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Maeders_Owl = function Maeders_Owl(u, v) {
	var x = 0.4 * (v * Math.cos(u) - 0.5 * this.params[0] * this.power(v, 2) * Math.cos(2 * u));
	var y = 0.4 * (-v * Math.sin(u) - 0.5 * this.params[0] * this.power(v, 2) * Math.sin(2 * u));
	var z = 0.4 * ((4 * this.power(v, 1.5) * Math.cos((3 * u) / 2)) / 3);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Astroidal_Ellipsoid = function Astroidal_Ellipsoid(u, v) {
	u /= 2;
	var x = 3 * this.power(Math.cos(u) * Math.cos(v), 3 * this.params[0]);
	var y = 3 * this.power(Math.sin(u) * Math.cos(v), 3 * this.params[0]);
	var z = 3 * this.power(Math.sin(v), 3 * this.params[0]);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Triaxial_Tritorus = function Triaxial_Tritorus(u, v) {
	var x = 1.5 * Math.sin(u) * (1 + Math.cos(v));
	var y = 1.5 * Math.sin(u + (constants.TWO_PI / 3) * this.params[0]) * (1 + Math.cos(v + (constants.TWO_PI / 3) * this.params[0]));
	var z = 1.5 * Math.sin(u + ((constants.TWO_PI * 2) / 3) * this.params[0]) * (1 + Math.cos(v + (constants.TWO_PI / 3) * this.params[0]));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Limpet_Torus = function Limpet_Torus(u, v) {
	var x = (1.5 * this.params[0] * Math.cos(u)) / (Math.sqrt(2) + Math.sin(v));
	var y = (1.5 * this.params[0] * Math.sin(u)) / (Math.sqrt(2) + Math.sin(v));
	var z = (1.5 * 1) / (Math.sqrt(2) + Math.cos(v));

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Horn = function Horn(u, v) {
	u /= Math.PI;
	// v /= Math.PI;
	var x = (2 * this.params[0] + u * Math.cos(v)) * Math.sin(Math.PI * 2 * u);
	var y = (2 * this.params[0] + u * Math.cos(v)) * Math.cos(Math.PI * 2 * u) + 2 * u;
	var z = u * Math.sin(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Shell = function Shell(u, v) {
	var x = this.params[1] * (1 - u / (Math.PI * 2)) * Math.cos(this.params[0] * u) * (1 + Math.cos(v)) + this.params[3] * Math.cos(this.params[0] * u);
	var y = this.params[1] * (1 - u / (Math.PI * 2)) * Math.sin(this.params[0] * u) * (1 + Math.cos(v)) + this.params[3] * Math.sin(this.params[0] * u);
	var z = this.params[2] * (u / (Math.PI * 2)) + this.params[0] * (1 - u / (Math.PI * 2)) * Math.sin(v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Kidney = function Kidney(u, v) {
	u /= 2;
	var x = Math.cos(u) * (this.params[0] * 3 * Math.cos(v) - Math.cos(3 * v));
	var y = Math.sin(u) * (this.params[0] * 3 * Math.cos(v) - Math.cos(3 * v));
	var z = 3 * Math.sin(v) - Math.sin(3 * v);

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Lemniscape = function Lemniscape(u, v) {
	u /= 2;
	var conv_sqrt_abs_sin_2u = Math.cos(v) * Math.sqrt(Math.abs(Math.sin(2 * this.params[0] * u)));
	var x = conv_sqrt_abs_sin_2u * Math.cos(u);
	var y = conv_sqrt_abs_sin_2u * Math.sin(u);
	var z = 3 * (this.power(x, 2) - this.power(y, 2) + 2 * x * y * this.power(Math.tan(v), 2));
	x *= 3;
	y *= 3;

	return [x / Math.PI, y / Math.PI, z / Math.PI];
};

GenerativeDesign.Mesh.prototype.Superformula = function Superformula(u, v) {
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
GenerativeDesign.Mesh.prototype.scale = function scale(scale) {
	this.mesh_scale = scale;
	this.update();
};

// calculates the surface normals
GenerativeDesign.Mesh.prototype.calculate_noramals = function (source) {
	// todo...
};

// get methods for returning the current values for each param
GenerativeDesign.Mesh.prototype.get_form = function get_form() {
	return this.form;
};

GenerativeDesign.Mesh.prototype.get_u_count = function get_u_count() {
	return this.u_count;
};

GenerativeDesign.Mesh.prototype.get_v_count = function get_v_count() {
	return this.v_count;
};

GenerativeDesign.Mesh.prototype.get_u_range = function get_u_range() {
	return [this.u_min, this.u_max];
};

GenerativeDesign.Mesh.prototype.get_v_range = function get_v_range() {
	return [this.v_min, this.v_max];
};

GenerativeDesign.Mesh.prototype.get_hue_range = function get_hue_range() {
	return [this.min_hue, this.max_hue];
};

GenerativeDesign.Mesh.prototype.get_saturation_range = function get_saturation_range() {
	return [this.min_saturation, this.max_saturation];
};

GenerativeDesign.Mesh.prototype.get_brightness_range = function get_brightness_range() {
	return [this.min_brightness, this.max_brightness];
};

GenerativeDesign.Mesh.prototype.get_alpha = function get_alpha() {
	return this.alpha;
};

// set methods are setting params
GenerativeDesign.Mesh.prototype.set_hue_range = function set_hue_range(min, max) {
	this.min_hue = min;
	this.max_hue = max;
};

GenerativeDesign.Mesh.prototype.set_saturation_range = function set_saturation_range(min, max) {
	this.min_saturation = min;
	this.max_saturation = max;
};

GenerativeDesign.Mesh.prototype.set_brightness_range = function set_brightness_range(min, max) {
	this.min_brightness = min;
	this.max_brightness = max;
};

GenerativeDesign.Mesh.prototype.set_alpha = function set_alpha(a) {
	this.alpha = a;
};

GenerativeDesign.Mesh.prototype.set_form = function set_form(form) {
	this.form = form;
};

GenerativeDesign.Mesh.prototype.set_u_count = function set_u_count(u) {
	this.u_count = u;
};

GenerativeDesign.Mesh.prototype.set_v_count = function set_v_count(v) {
	this.v_count = v;
};

GenerativeDesign.Mesh.prototype.set_u_range = function set_u_range(min, max) {
	this.u_min = min;
	this.u_max = max;
};

GenerativeDesign.Mesh.prototype.set_v_range = function set_v_range(min, max) {
	this.v_min = min;
	this.v_max = max;
};

GenerativeDesign.Mesh.prototype.set_params = function set_params() {
	var num_args = arguments.length;

	if (num_args > this.params.length) {
		num_args = this.params.length;
	}

	for (var i = 0; i < num_args; i++) {
		this.params[i] = arguments[i];
	}
};

GenerativeDesign.Mesh.prototype.set_scale = function set_scale(scale) {
	this.mesh_scale = scale;
};

GenerativeDesign.Mesh.prototype.power = function (b, e) {
	if (b >= 0 || Math.floor(e) == e) {
		return Math.pow(b, e);
	} else {
		return -Math.pow(-b, e);
	}
};

GenerativeDesign.Mesh.prototype.color_matrix = function color_matrix() {
	return this.meshcolor;
};

GenerativeDesign.Mesh.prototype.normals_matrix = function normals_matrix() {
	//todo..
};

GenerativeDesign.Mesh.prototype.vertex_matrix = function vertex_matrix() {
	return this.points;
};

exports.GenerativeDesign = GenerativeDesign;
