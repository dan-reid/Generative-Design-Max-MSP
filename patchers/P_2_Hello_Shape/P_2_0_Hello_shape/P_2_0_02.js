autowatch = 1;
var { PClone } = require('PClone');
var mg;
var pc;
var outputmatrix;
var mu;
var width;
var height;
var mouseX = 0;
var mouseY = 0;
var mousepressed = 0;
var maxhue = 360;
var maxsat = 100;
var maxbri = 100;
var maxalpha = 100;
var colorhsb;

setup();

function setup() {
	width = 640;
	height = 480;
	// jit.mgraphics
	mg = new JitterObject("jit.mgraphics", width, height);
	// the matrix to store and display jit.mgraphics's output
	outputmatrix = new JitterMatrix(4, "char", width, height);

	pc = new PClone();

	background(1, 1, 1, 1);
	colorhsb = [0, 0, 0, 10];

}

function draw() {

	if(mousepressed) {
		mg.save(); // pushMatrix();
		var vertices = [];
		mg.translate(width/2, height/2);
		var circle_resolution = Math.floor(pc.map(mouseY + 100, 0, height, 2, 10));
		var radius = mouseX - width / 2 + 0.5;
		var angle = (Math.PI*2) / circle_resolution;

		colorrgb = pc.hsba_to_rgba(colorhsb);
		mg.set_source_rgba(colorrgb);

		for(var i = 0; i <= circle_resolution; i++) {
			var x = Math.cos(angle * i) * radius;
			var y = Math.sin(angle * i) * radius;
			vertices[i] = pc.create_vector(x, y);
		}

		for(var i = 0; i < vertices.length-1; i++) {
			mg.move_to(vertices[i].x, vertices[i].y);
			mg.line_to(vertices[i+1].x, vertices[i+1].y);
			mg.stroke();
		}
		mg.restore() // popMatrix();
	}
	// this should always be last in the draw function
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function mousexy(x, y, mp) {
	mousepressed = mp;
	mouseX = x;
	mouseY = y;

}

function clear() {
	background(1, 1, 1, 1);
}

function set_color(v) {
	if (v === 0) colorhsb = [0, 0, 0, 10];
	if (v === 1) colorhsb = [192/maxhue, 100/maxsat, 64/maxbri, 10/maxalpha];
	if (v === 2) colorhsb = [52/maxhue, 100/maxsat, 71/maxbri, 10/maxalpha];
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
