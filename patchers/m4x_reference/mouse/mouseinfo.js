/*
 * Includes the mousex, mousey, and mousedown valiables in the script.
 * It also automatically enables idlemouse polling in the instance of
 * jit.world located in the main patcher.
 */
include('gd.mouseinfo');

var mg = new JitterObject('jit.mgraphics', 640, 480);
var outputmatrix = new JitterMatrix(4, 'char', 640, 480);

function draw() {
	background([1, 1, 1, 1]);
	var d = 100;
	var pos_x = mousex - d / 2;
	var pos_y = mousey - d / 2;
	mg.ellipse(pos_x, pos_y, d, d);

	if (mousedown) {
		mg.fill();
	} else {
		mg.stroke();
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
