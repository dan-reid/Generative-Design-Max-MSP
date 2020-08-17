# Generative Design Max MSP Package

This is a port of the [Generative Design](http://www.generative-gestaltung.de/) library and stetch examples to Max/MSP. It also includes some of the functionality of the [p5js](https://p5js.org/) library to make porting the examples a little less painfull. Full credit should be given to the authors of the Generative Design book and the p5.js creators and community.

## Installation

1. Clone or download this repo and move it to your Max Packages folder.
2. If Max was running when you added the package, restart it.

If you edit any of the `.js` files in the `code` directory you'll need to restart Max for the changes to take affect.

## m4x()

`m4x` is a small-ish library of useful functions cloned (stolen) from the [p5js](https://p5js.org/) library. If you're wondering about the dodgy name, `m4x` is leet speak for `max`. It was mainly chosen because it contained "m4", which - given it's a max ripoff of p5 - I felt was somewhat fitting. Of course, like almost all library names, I am embarrassed and ashamed of it now, but not enough to actually go the effort of changing it so on we go...

### Usage

```
var { m4x } = require('m4x');  // require the library
var m4 = new m4x() // create a new m4x instance

```

### Methods

#### Math

#### m4x.constrain()

Constrains a value between a minimum and maximum value

```

```
