# Generative Design Max MSP Package

This is a port of the [Generative Design](http://www.generative-gestaltung.de/) library and stetch examples to Max/MSP. It also includes some of the functionality of the [p5js](https://p5js.org/) library to make porting the examples a little less painfull. Full credit should be given to the authors of the Generative Design book and the p5.js creators and community.

## Installation

1. Clone or download this repo and move it to your Max Packages folder.
2. If Max was running when you added the package, restart it.

If you edit any of the `.js` files in the `code` directory you'll need to restart Max for the changes to take affect.

## m4x()

`m4x` is a library of useful functions cloned from the [p5js](https://p5js.org/) library. If you're wondering about the name, `m4x` is leet speak for `max`. It was mainly chosen because it contained "m4", which - given it's a Max ripoff of p5js - I felt was somewhat fitting.

Naturally, I have grown to hate the name - but not enough to actually go the effort of changing it, so on we go...

### Usage

```
var { m4x } = require('m4x');  // require the library
var m4 = new m4x()             // create a new m4x instance
```

### Naming convention

For the sake of consistency, this package following the naming convention of `mgraphics` and therefore all method names are in snake_case rather then camelCase.

### Drawing

`m4x` doesn't contain any of the drawing methods from the p5js libray, so you will still need to use `mgraphics` to actually draw things to the window.

The reason for this is that the purpose of this package is not to try to reinvent the wheel or create a full clone of p5js inside Max, but rather to make transitioning from the p5js way of doing thing to the `mgraphics` way of doing things a little easier.

However, it does add some functionality that didn't exist in `mgraphics` or `js` in the Max realm in general, notably:

- A Color class with `RGB`, `HSB`, & `HSL` modes (all made compatible with `mgraphics` so you don't have to worry about color conversion)
- A seedable random number genertor
- A perlin noise genertor.

### p5.js versus mgraphics

The following gives an overview of some differences you'll come across when moving a `p5` sketch to `mgraphics`. The list is by no means exhaustive and I recommend you take a look at the `mgraphics` [referance](https://docs.cycling74.com/max7/refpages/jit.mgraphics) as well as read up on [JavaScript in the Max realm](https://docs.cycling74.com/max8/vignettes/javascript_usage_topic). However, hopefully these few tips will help ease the transition a little:

#### creating a new mgraphics instance

```javascript
var width = 200;
var height = 200;

// this is your mgraphics instance
var mgraphics = new JitterObject('jit.mgraphics', width, height);

// this is the matrix mgraphics will draw to
var outputmatrix = new JitterMatrix(4, 'char', width, height);

function draw() {
	// code for fancy generative art

	// this should always be last in the draw function
	mgraphics.matrixcalc(outputmatrix, outputmatrix);
	outlet(0, 'jit_matrix', outputmatrix.name);
}
```

#### ellipse

In p5js the `x` & `y` parameters give the location of the centre point. However, in mgraphics they give the location of the upper-left corner of the shape. To offset them to the centre point, you need to subtract the radius:

```javascript
var x = width / 2;
var y = width / 2;
var diameter = 50;

// p5
p5.ellipse(x, y, diameter, diameter);

//mgraphics
var radius = diamater / 2;
mgraphics.ellipse(x - radius, y - radius, diameter, diameter);
```

#### rectangle

```javascript
var x = 0;
var y = 0;
var w = 100;
var h = 100;

// p5
p5.rect(x, y, w, h);

// mgraphics
mgraphics.rectangle(x, y, w, h);
```

#### line

Drawing a line in `mgraphics` requires two functions. First, you use `move_to` to define the line's start point, then `line_to` to define the line's end point.

```javascript
var x1 = 10;
var y1 = 10;
var x2 = 70;
var x2 = 70;

// p5
p5.line(x1, y1, x2, y2);

// mgraphics
mgraphics.move_to(x1, y1);
mgraphics.line_to(x2, y2);
```

#### fill() and stroke()

One of the most important differences between `p5` and `mgraphics` are the fill() and stroke() functions. In the p5 world, they simply set the the stroke and fill color. However, in the `mgraphics` world they are actually required to draw the shape and we need to use `set_source_rgba` to set the drawing color.

```javascript
// p5js - draws a red rectangle
p5.fill(255, 0, 0, 255);
p5.rect(50, 50, 20, 30);
// ...shape is automatically drawn to the screen

// mgraphics
mgraphics.set_source_rgba(1, 0, 0, 1);
mgraphics.rectangle(50, 50, 20, 30);
mgraphics.fill(); // without this, the shape isn't actually drawn
```

#### color

    When using `mgraphics`, color values are normalized between 0 - 1 and are alway ing RGB colour space. While in many instances, this is perfectly fine - it can sometimes feel less intuitive in work in this way. To get around this you can use the `m4x.color()` which is a clone of `p5`'s color object and support RBG, HSB, and HSL color modes while remaining fully compatible with `mgraphics`.

    ```javascript
    var { m4x } = require('m4x');
    var m4 = new m4x();

    var lovely_green = m4.color(51, 200, 100);
    mgraphics.set_source_rgba(lovely_green);
    mgraphics.rectangle(50, 50, 20, 30);
    mgraphics.fill();

    m4.color_mode('HSB', 360, 100, 100);
    var mellow_yellow = m4.color(56, 99, 100);
    mgraphics.set_source_rgba(mellow_yellow);
    mgraphics.rectangle(50, 50, 10, 10);
    mgraphics.fill();
    ```

### [Calculations](https://github.com/danreidxy/Generative-Design-Max-MSP/blob/add-examples/code/m4x.calculation.js)

#### m4x.constrain(val, min, max)

#### m4x.dist(x1, y1, [z1], x2, y2, [z2])

#### m4x.lerp(start, stop, amount)

#### m4x.mag(x, y)

#### m4x.radians(degreees)

#### m4x.degrees(radians)

#### m4x.map(n, start1, stop1, start2, stop2, [withinBounds])

#### m4x.norm(n, start, stop)

### Math

#### m4x.create_vector([x], [y], [z])

### Random

#### m4x.random([min], [max])

#### m4x.random_seed(seed)

### Noise

#### m4x.noise(x, [y], [z])

#### m4x.noise_detail(lod, falloff)

#### m4x.noise_seed(seed)

### Color

```javascript
/**
 * @method color(gray, [alpha])
 * @method color(v1, v2, v3, [alpha])
 *
 * Creates colors for storing in variables of the color datatype.
 * The parameters are interpreted as RGB or HSB values depending on the current color_mode().
 * The default mode is RGB values from 0 to 255 and, therefore, the function call color(255, 204, 0)
 * will return a bright yellow color.
 *
 * Note that if only one value is provided to color(), it will be interpreted as a grayscale value.
 * Add a second value, and it will be used for alpha transparency. When three values are specified,
 * they are interpreted as either RGB or HSB values. Adding a fourth value applies alpha transparency.
 *
 * Regardless of color_mode, the m4x.Color() class will adjust its values internally to ensure they are compatible with mgraphics
 *
 * Parameters
 * @param {number} gray     number specifying value between white and black.
 * @param {number} [alpha]  alpha value relative to current color range (default is 0-255) (Optional)
 * @param {number} v1       red or hue value relative to the current color range
 * @param {number} v2       green or saturation value relative to the current color range
 * @param {number} v3       blue or brightness value relative to the current color range
 *
 * @returns {m4x.Color}
 *
 */
```

#### m4x.color_mode(mode, ch1, ch2, ch3, ch4)
