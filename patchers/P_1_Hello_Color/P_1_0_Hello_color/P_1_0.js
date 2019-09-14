autowatch = 1;
var mg;
var pc;
var output_matrix;
var mu;
var width;
var height;
var mouse_x = 360;
var mouse_y = 360;


setup();

function setup() {
	width = 720;
	height = 720;
	// jit.mgraphics
	mg = new JitterObject("jit.mgraphics", width, height);
	// the matrix to store and display jit.mgraphics's output
	output_matrix = new JitterMatrix(4, "char", width, height);

	pc = new PClone();
}

function draw() {
	var param_y = mouse_y;
	var param_x = mouse_x;
	param_y = pc.map(param_y, 0, height, 0, 1);

	var bg_col = [param_y * 0.5, 1, 1];
	bg_col = pc.hsb_to_rgb(bg_col);

	background(bg_col[0], bg_col[1], bg_col[2], 1);

	var fg_col = [1-(param_y*0.5), 1, 1];
	fg_col = pc.hsb_to_rgb(fg_col);

	mg.set_source_rgb(fg_col);

	mg.rectangle(360 - (param_x+1)/2, 360 - (param_x+1)/2, param_x+1, param_x+1);
	mg.fill();

	// this should always be last in the draw function
	mg.matrixcalc(output_matrix, output_matrix);
	outlet(0, "jit_matrix", output_matrix.name);
}

function mousemoved(x, y) {
	mouse_x = x;
	mouse_y = y;
}

function background(r, g, b, a) {
	mg.set_source_rgba(r, g, b, a);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill bg_color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(output_matrix, output_matrix);
}
