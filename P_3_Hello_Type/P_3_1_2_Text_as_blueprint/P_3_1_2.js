autowatch = 1;
var mg;
var mgframe;
var datapath;
var bg; // background color
var width;
var height;
var centrex;
var centrey;
var offsetx;
var offsety;
var zoom;
var mousex;
var mousey;
var on_click_x = 0;
var on_click_y = 0;
var mousepressed = 0;
var framecount = 0;

var font;
var text;
var BACKSPACE = 127;
var RETURN = 13;
var seed;
var s = 0;
var index = 0

setup();

function setup() {
  datapath = getpath();
	width = 1000;
	height = 1000;
	mg = new JitterObject("jit.mgraphics", width, height);
	mgframe = new JitterMatrix("text_bp", 4, "char", width, height);
	bg = [1, 1, 1, 1];
	centrex = width/2;
	centrey = height/2;
	offsetx = 0;
	offsety = 0;
	zoom = 0.75;

	font = 'Andale Mono'
	text = "In fifteen seconds, the difference between composition and improvisation is that\n"
	text += "in composition you have all the time you want to think about what you want to say in fifteen seconds,\n\n"
	text += "while in improvisation you have only fifteen seconds.\n\n"
	text += "- Steve Lacy"
  // text = '';
  clear();
}


function draw() {
	clear();

	seed = s;

	if (mousepressed) {
		centrex = mousex - offsetx;
		centrey = mousey - offsety;
	}
  var drawEndTime = millis() + 10;
	with(mg) {
		select_font_face(font);
		set_font_size(25);
		translate(centrex, centrey);
		scale(zoom, zoom);

  	for(var i = 0; i < text.length; i++) {
  		set_font_size(25);
  		var letter = text.charAt(i);
  		var tm = text_measure(letter);
  		var letterwidth = tm[0];

  		switch(letter) {
  			case ' ': //space
  				var dir = Math.floor(random(2));
  				if(dir == 0) {
  					mg.svg_render(datapath+"space.svg");
  					translate(1.9, 0);
  					rotate(Math.PI/4);
  				}
  				if(dir == 1) {
  					mg.svg_render(datapath+"space2.svg");
  					translate(13, -5);
  					rotate(-Math.PI/4);
  				}
  				break;

  			case ',':
  				mg.svg_render(datapath+"comma.svg");
  				translate(34, 15);
  				rotate(Math.PI/4);
  				break;

  			case '.':
  				mg.svg_render(datapath+"period.svg");
  				translate(56, -54);
  				rotate(-Math.PI/4);
  				break;

  			case '!':
  				mg.svg_render(datapath+"exclamationmark.svg");
  				translate(42, 17.4);
  				rotate(Math.PI/4)
  				break;

  			case '?':
  				mg.svg_render(datapath+"questionmark.svg");
  				translate(42, -18);
  				rotate(-Math.PI/4);
  				break;

  			case '\n': // return
  				mg.svg_render(datapath+"return.svg");
  				translate(0, 10);
  				rotate(Math.PI);
  				break;

  			default: // all others
  				set_source_rgb(0,0,0);
  				move_to(0, 0);
  				show_text(letter);
  				translate(letterwidth, 0);
  		}
    }
    framecount++;
    set_line_width(10);
    if(framecount / 6 % 4 == 0) rectangle(0, 0, 15, 2);
    stroke();
	}

	mg.matrixcalc(mgframe, mgframe);
}

function load_strings(f) {
	var strings = []
	var tf = new File(f);
	tf.open();
	var i = 0;
	while(tf.isopen && tf.position < tf.eof) {
		strings[i] = tf.readline();
		i++;
	}
	tf.close();
	return strings;
}

function millis() {
	var ms = new Date().getTime();
	return ms;
}

function keypressed(k) {
  switch(k) {
    case BACKSPACE:
      text = text.substring(0, Math.max(0, text.length - 1));
      break;
    case RETURN:
      text += "\n";
      break;
    default:
      text += String.fromCharCode(k);
}

}

function mousexy(x, y, mp) {
	mousex = x;
	mousey = y;
	mousepressed = mp;
}

function mousexy_on_click(x, y){
	on_click_x = x;
	on_click_y = y;
	offsetx = on_click_x - centrex;
	offsety = on_click_y - centrey;
}

function change_font(f) {
	font = f;
}

function set_zoom(z) {
	zoom = z;
}

function random(v) {
    var x = Math.sin(seed++) * 1000;
    x -= Math.floor(x);
    return x * v;
}

function newseed() {
  s = Math.floor(Math.random()*1000);
}

function getpath() {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat'
	p = p.replace(n, 'data/');
  return p;
}

function set_new_text(t) {
  text = t;
}

function clear() {
	with(mg) {
		set_source_rgba(bg);
	  paint();
	  set_source_rgba(0, 0, 0, 1); // default stroke/ fill color
	  identity_matrix();
	  move_to(0, 0);
    matrixcalc(mgframe, mgframe);
	}
}
