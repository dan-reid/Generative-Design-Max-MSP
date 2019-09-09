autowatch = 1;
var width = 512;
var height = 128;
var mg = new JitterObject("jit.mgraphics", width, height);; // jit.mgraphics
var pc = new PClone();// PClone library
var outputmatrix = new JitterMatrix(4, "char", width, height);
var noise_offset = 0;


function plot_perlin_noise() {
		background(1, 1, 1, 1);
		var random_offset = pc.random(10000);
		mg.move_to(-1, -1);
		for(var x = 0; x < width; x+=10) {
				noise_offset = x / 150;
				y = pc.noise(noise_offset+random_offset) * height; // scale to height
				mg.set_source_rgb(0, 130/255, 164/255);
				mg.line_to(x, y);
				mg.stroke();
				mg.set_source_rgb(0, 0, 0);
				mg.ellipse(x-2, y-2, 4, 4);
				mg.fill();
				mg.move_to(x, y);
		}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}

function plot_random() {
		background(1, 1, 1, 1);

		mg.move_to(-1, -1);
		for(var x = 0; x < width; x+=10) {
				y = pc.random() * height
				mg.set_source_rgb(0, 0.5, 0.64);
				mg.line_to(x, y);
				mg.stroke();
				mg.set_source_rgb(0, 0, 0);
				mg.ellipse(x-2, y-2, 4, 4);
				mg.fill();
				mg.move_to(x, y);
		}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
}


function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
