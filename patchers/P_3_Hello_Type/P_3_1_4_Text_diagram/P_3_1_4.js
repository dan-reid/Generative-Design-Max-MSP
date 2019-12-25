autowatch = 1;
var { PClone } = require('PClone');
var mg;
var outputmatrix;
var bg; // background color
var datapath;
var width;
var height;

var font = 'Ariel';
var joinedtext = [];
var stopwords = [];
var treemap;
var textfile;
var dosort = true;
var usestopwords = true;
var rowdirection = 'both';

// you can set a min and max word length here:
// if you'd perfer not to, just the min to 0, and the
// max to some really high number.
var minwordlength = 3, maxwordlength = 10;

setup();

function setup() {
	datapath = getpath(); // get the path to the data folder
	width = 1024;
	height = 1024;
	mg = new JitterObject("jit.mgraphics", width, height);
	outputmatrix = new JitterMatrix(4, "char", width, height);
	bg = [1, 1, 1, 1];


	clear();
}

function analyse_text(t) {
	textfile = t;
	/*
	the original version found in both processing and p5js
	doesn't use a stopword list, rather the treemap class
	has an 'ignore' array build into it. This works on based
	on the index of a word already in the treemap, rather than
	a reference to word itself. See the orginal p5js sketch
	for an example on how to use it.
	*/
	stopwords = load_strings(datapath+'stopwords.txt');
	// load the textfile
	joinedtext = load_strings(datapath+textfile);
	joinedtext = joinedtext.join(' ');
	// gets rid of numbers
	joinedtext = joinedtext.replace(/\d+/g, '');
	var words = joinedtext.match(/\w+/g);

	treemap = new Treemap(1, 1, width - 3, height - 3, {
		sort:dosort,
		direction:rowdirection,
		padding: 2,
		ignore:[]
	});

	//count words
	if(usestopwords) {
		for (var i = 0; i < words.length; i++) {
			var w = words[i].toLowerCase();
			if(w.length < minwordlength || w.length > maxwordlength) continue;
			var stopword = test_stopword(w);
			if (!stopword) {
				treemap.addData(w);
			}
		}
	}
	else {
		for (var i = 0; i < words.length; i++) {
			var w = words[i].toLowerCase();
			if(w.length < minwordlength || w.length > maxwordlength) continue;
			treemap.addData(w);
		}
	}
	treemap.calculate();
	draw();
}

function draw() {
	clear();

	with(mg) {
		select_font_face(font);
		for (var i = 0; i < treemap.items.length; i++) {
			var item = treemap.items[i];

			rectangle(item.x, item.y, item.w, item.h);
			stroke();

			var word = item.data;
			set_font_size(100); // set an initial font size
			var tm = text_measure(word); // measure the width of the word based on this size
			var fontsize = 100 * (item.w * 0.9) / tm[0]; // scale it to fit the rectangle
			fontsize = Math.min(fontsize, (item.h * 0.9));
			set_font_size(fontsize); // set the scaled fontsize
			tm = text_measure(word); // measure the width with the new font size in order to centre it
			move_to((item.x-tm[0]/2) + item.w / 2, item.y + item.h * 0.8); // set the cursor
			show_text(word); // draw the text
			fill();
		}
	}
	mg.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, "jit_matrix", outputmatrix.name);
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

function getpath() {
	var p = this.patcher.filepath;
	var n = this.patcher.name;
	n += '.maxpat'
	p = p.replace(n, 'data/');
	return p;
}

function test_stopword(word) {
	for (var i = 0; i < stopwords.length; i++) {
		if (word == stopwords[i]) {
			return true;
			break;
		}
	}
		return false;
}

function applyfilter(v) {
	usestopwords = v;
	analyse_text(textfile);
	draw();
}

function setrowdirection(d) {
	rowdirection = d;
	treemap.options.direction = rowdirection;
	treemap.calculate();
	draw();
}

function sort(s) {
	dosort = s;
	treemap.options.sort = dosort;
	treemap.calculate();
	draw();
}


function change_font(f) {
	font = f;
	draw();
}


function clear() {
	with(mg) {
		set_source_rgba(bg);
	  paint();
	  set_source_rgba(0, 0, 0, 1); // default drawing color
		move_to(0, 0);
		identity_matrix();
		matrixcalc(outputmatrix, outputmatrix);
	}
}

/*
The Treemap class has just been pretty much copy and pasted from
the p5js Generative Design library except for some minor changes:

1: Functions specific to the p5js library have been replaced with either
   native javascript or mgraphic's drawing functions.
2: The Array.findIndex method has been replaced with code to mimic its function
   as it's not supported in the version of js used in max.
*/

function Treemap() {
  this.parent;
  this.data;
  this.count = 0;
  this.items = [];

  /**
  * x position of the rectangle.
  * @property x
  * @type {Number}
  */
  this.x = 0;
  /**
  * y position of the rectangle.
  * @property y
  * @type {Number}
  */
  this.y = 0;
  /**
  * width of the rectangle.
  * @property w
  * @type {Number}
  */
  this.w = 0;
  /**
  * height of the rectangle.
  * @property h
  * @type {Number}
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
  * @property minCount
  * @type {Number}
  */
  this.minCount = 0;
  /**
  * the maximum count value of the items in the items array
  * @property maxCount
  * @type {Number}
  */
  this.maxCount = 0;

  /**
  * level of the item; the root node has level 0
  * @property level
  * @type {Number}
  */
  if (this.parent) this.level = this.parent.level + 1;
  else this.level = 0;

  /**
  * the depth of the branch; end nodes have depth 0
  * @property depth
  * @type {Number}
  */
  this.depth = 0;

  /**
  * the number of items in the complete branch
  * @property itemCount
  * @type {Number}
  */
  this.itemCount = 1;

  /**
  * index of the item in the sorted items array..
  * @property index
  * @type {Number}
  */
  this.index = 0;

  this.root = this;
  this.isRoot = true;
  if (this.parent) {
    this.root = this.parent.root;
    this.isRoot = false;
  };
  this.options = this.options || this.root.options;

  this.ignored = false;

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
    * @method addData
    * @param {String|Number|Object|Array} data   the data element (e.g. a String)
    * @param {Object} [keys]                     which keys should be used to build the Treemap: e.g. {children:"items", count:"size", data:"name"}. See the example for different ways how to use that.
    * @return {Boolean}                          returns true, if a new treemap was created
  */

  Treemap.prototype.addData = function(data, keys) {
    if (keys) {
      // store data. If a key is given, just store that part of the object, otherwise the whole branch.
      if (keys.data) this.data = data[keys.data];
      else this.data = data;

      // store counter. if data is a number, just use that as a counter. if data is an object, store what's given at the key 'count'.
      if (typeof data === "number") this.count = data;
      else this.count = data[keys.count] || 0;

      // get children. if the key 'children' is defined use that. otherwise data might be just an array, so use it directly.
      var children = data;
      if (keys.children) children = data[keys.children];

      if (children instanceof Array) {
        children.forEach(function(child) {
          var t = new Treemap(this);
          this.items.push(t);
          t.addData(child, keys);
        }.bind(this));
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
        this.items.push(new Treemap(this, data, 1));
      }
      return true;
    }
    // There should have been reached one of the other returns. If not:
    return false;
  }

  /**
    * Adds an empty treemap to this treemap. If data is given, this could be used
    * to show and hide a complete sub-treemap from the diagram. There is no check,
    * if there is already another treemap with that data.
    *
    * @method addTreemap
    * @param {String|Number|Object|Array} data the data element (e.g. a String)
    * @param {Number} [count]                  the initial counter
    * @return {Treemap}                        returns the new Treemap
  */
  Treemap.prototype.addTreemap = function(data, count) {
    var t = new Treemap(this, data, count);
    this.items.push(t);
    return t;
  }

  // The size of a rectangle depends on the counter. So it's important to sum
  // up all the counters recursively. Only called internally.
  Treemap.prototype.sumUpCounters = function() {
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
        var sum = this.items[i].sumUpCounters();
        this.count += sum;
        this.minCount = Math.min(this.minCount, sum);
        this.maxCount = Math.max(this.maxCount, sum);
        this.depth = Math.max(this.depth, this.items[i].depth + 1);
        this.itemCount += this.items[i].itemCount;
      }
    }
    return this.count;
  }

  /**
    * Calculates the rectangles of each item. While doing this, all counters
    * and ignore flags are updated.
    *
    * @method calculate
  */
  Treemap.prototype.calculate = function() {
    // Stop immediately, if it's an empty array
    if (this.items.length == 0) return;

    // if it's the root node, sum up all counters recursively
    if (this == this.root) this.sumUpCounters();

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
      this.items.sort(function(a, b) {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        else return 0;
      });
    } else {
      // shuffle explicitly
      shuffleArray(this.items);
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
        var avRel = (a / rowCount) / bLen;

        // Let's assume it's a horizontal row. The rects are as square as possible,
        // as soon as the average width (a / rowCount) gets smaller than the row height (bLen).
        if (avRel < 1 || i == this.items.length - 1) {
          // Which is better, the actual or the previous fitting?
          if (avRelPrev < 1 / avRel) {
            // previous fitting is better, so revert to that
            rowSum -= this.items[i].count;
            rowCount--;
            bLen = b * rowSum / restSum;
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
            var aPart = aLen * this.items[j].count / rowSum;
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
    * A simple recursive drawing routine. Draws only the rectangles. If you want to draw more of the
    * content you can supply a function for drawing one item. This function gets the actual item
    * as a parameter and has access to all the fields of that item, most important x, y, w, and h.
    * Example:
    * ```
    * myTreemap.draw(function(item) {
    *   var r = min(item.w/4, item.h/4, 5);
    *   rect(item.x, item.y, item.w, item.h, r);
    * });
    * ```
    *
    * @method draw
    * @param {Function} [drawItemFunction] a function that draws one item
  */
  Treemap.prototype.draw = function(drawItemFunction) {
    if (!this.ignored) {

      // use the drawing function if given, otherwise draw a simple rect.
      if (drawItemFunction) drawItemFunction(this);
      else mg.rectangle(this.x, this.y, this.w, this.h);

      for (var i = 0; i < this.items.length; i++) {
        this.items[i].draw(drawItemFunction);
      }
    }
  };
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 *
 * @ignore
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
