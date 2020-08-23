/*
 * Includes the mousex, mousey, and mousedown valiables in the script.
 * It also automatically enables idlemouse polling in the instance of
 * jit.world located in the main patcher.
 */
include('m4x.mouseinfo');

var width = 200;
var height = 200;

var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

function draw() {
	background([1, 1, 1, 1]);
	var d = 20;
	var pos_x = mousex - d / 2;
	var pos_y = mousey - d / 2;

	mg.move_to(mousex, 0);
	mg.line_to(mousex, height);
	mg.move_to(0, mousey);
	mg.line_to(width, mousey);
	mg.stroke();

	if (mousedown) {
		mg.ellipse(pos_x, pos_y, d, d);
		mg.fill();
	}

	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function mousepressed(x, y) {
	post('mousepressed', 'x value:', x, 'y value', y, '\n');
}

function mousemoved(x, y, leftbutton, rightbutton) {
	post('mousemoved', 'x value:', x, 'y value', y, 'leftbutton', leftbutton, 'rightbutton', rightbutton, '\n');
}

function background(c) {
	mg.set_source_rgba(c);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1); // default stroke/ fill bg_color
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
