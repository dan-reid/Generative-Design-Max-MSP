// https://p5js.org/reference/#/p5/constrain

/**
 * @method constrain(n, low, high)
 *
 * Parameters
 * @param   {number} n     number to constrain
 * @param   {number} low   minimum limit
 * @param   {number} high  maximum limit
 *
 * @returns {number}       constrained number
 */

include('m4x.mouseinfo');

var width = 200;
var height = 200;

var { m4x } = require('m4x');
var m4 = new m4x();

var mg = new JitterObject('jit.mgraphics', width, height);
var outputmatrix = new JitterMatrix(4, 'char', width, height);

function draw() {
	background([1, 1, 1, 1]);

	var diff = 60;

	var left_wall = diff;
	var right_wall = width - diff;

	// xm is just the mousex, while
	// xc is the mousex, but constrained
	// between the left_wall and right_wall!
	var xm = mousex;
	var xc = m4.constrain(mousex, left_wall, right_wall);

	var wall_col = m4.color(150);

	mg.set_source_rgb(wall_col.normalize());
	mg.move_to(left_wall, 0);
	mg.line_to(left_wall, height);

	mg.move_to(right_wall, 0);
	mg.line_to(right_wall, height);
	mg.stroke();

	var ball_col_1 = m4.color(150);
	var ball_col_2 = m4.color(0);

	var ball_diameter = 9;
	var ball_radius = ball_diameter / 2;

	var ball1_x = xm - ball_radius;
	var ball1_y = 33 - ball_radius;
	mg.set_source_rgb(ball_col_1.normalize());
	mg.ellipse(ball1_x, ball1_y, ball_diameter, ball_diameter);

	var ball2_x = xc - ball_radius;
	var ball2_y = 66 - ball_radius;
	mg.set_source_rgb(ball_col_2.normalize());
	mg.ellipse(ball2_x, ball2_y, ball_diameter, ball_diameter);

	mg.fill();
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}

function background(c) {
	mg.set_source_rgba(c);
	mg.paint();
	mg.set_source_rgba(0, 0, 0, 1);
	mg.identity_matrix();
	mg.move_to(0, 0);
	mg.matrixcalc(outputmatrix, outputmatrix);
}
