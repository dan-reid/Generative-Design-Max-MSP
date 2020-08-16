autowatch = 1;
include('gd.mouseinfo');

var { m4x } = require('m4x');
var { GenerativeDesign } = require('GenerativeDesign');
var mg;
var m4;
var outputmatrix;
var width;
var height;

var node_count = 50;
var nodes = [];
var springs = [];

var selected_node = null;
var node_diameter = 16;

setup();

function setup() {
	width = 600;
	height = 600;

	mg = new JitterObject('jit.mgraphics', width, height);
	outputmatrix = new JitterMatrix(4, 'char', width, height);

	m4 = new m4x();

	var data = init_nodes_and_springs(width, height, node_count);
	nodes = data.nodes;
	springs = data.springs;
}

function draw() {
	background(1, 1, 1, 1);

	if (!mousedown && selected_node !== null) {
		selected_node = null;
	}

	// let all nodes repel each other
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].attract_nodes(nodes);
	}
	// apply spring forces
	for (var i = 0; i < springs.length; i++) {
		springs[i].update();
	}
	// apply velocity vector and update position
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].update();
	}

	if (selected_node !== null) {
		selected_node.x = mousex;
		selected_node.y = mousey;
	}

	var spring_color = m4.color(0, 130, 164);
	mg.set_source_rgb(spring_color.normalize());
	for (var i = 0; i < springs.length; i++) {
		mg.move_to(springs[i].from_node.x, springs[i].from_node.y);
		mg.line_to(springs[i].to_node.x, springs[i].to_node.y);
		mg.stroke();
	}

	for (var i = 0; i < nodes.length; i++) {
		mg.set_source_rgb(1, 1, 1);
		mg.ellipse(nodes[i].x, nodes[i].y, node_diameter, node_diameter);
		mg.fill();

		mg.set_source_rgb(0, 0, 0);
		mg.ellipse(nodes[i].x, nodes[i].y, node_diameter - 4, node_diameter - 4);
		mg.fill();
	}

	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function init_nodes_and_springs(w, h, n_nodes) {
	var the_nodes = [];

	var radius = node_diameter / 2;
	for (var i = 0; i < n_nodes; i++) {
		var node = new GenerativeDesign.Node(w / 2 + m4.random(-100, 100), h / 2 + m4.random(-100, 100));
		node.set_boundary(radius, radius, w - radius, h - radius);
		node.set_radius(100);
		node.set_strength(-5);
		the_nodes.push(node);
	}

	var the_springs = [];

	for (var j = 0; j < the_nodes.length - 1; j++) {
		var rcount = Math.floor(m4.random(1, 2));

		for (var i = 0; i < rcount; i++) {
			var r = Math.floor(m4.random(j + 1, the_nodes.length - 1));
			if (the_nodes[j] && the_nodes[r]) {
				var spring = new GenerativeDesign.Spring(the_nodes[j], the_nodes[r]);
				spring.set_length(20);
				spring.set_stiffness(1);
				the_springs.push(spring);
			}
		}
	}
	return { nodes: the_nodes, springs: the_springs };
}

function mousepressed(x, y) {
	var max_dist = 200;
	for (var i = 0; i < nodes.length; i++) {
		var check_node = nodes[i];
		var d = m4.dist(x, y, check_node.x, check_node.y);
		if (d < max_dist) {
			selected_node = check_node;
			max_dist = d;
		}
	}
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
