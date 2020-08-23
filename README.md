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

### Drawing
`m4x` doesn't contain any of the drawing methods from the p5js libray, so you will still need to use `mgraphics` to actually draw things to the window. 

The reason for this is that the purpose of this package is not to try to reinvent the wheel or create a full clone of p5js inside Max, but rather to make transitioning from the p5js way of doing thing to the `mgraphics` way of doing things a little easier. 

However, it does add some functionality that didn't exist in `mgraphics` or `js` in the Max realm in general, notably: 
- A Color class with `RGB`, `HSB`, & `HSL` modes (all made compatible with `mgraphics` so you don't have to worry about color conversion)
- A seedable random number genertor 
- A perlin noise genertor.

### Naming convention
For the sake of consistency, this package following the naming convention of `mgraphics` and therefore all method names are in snake_case rather then camelCase. 

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

#### m4x.color(ch1, ch2, ch3, ch4)

#### m4x.color_mode(mode, ch1, ch2, ch3, ch4)
