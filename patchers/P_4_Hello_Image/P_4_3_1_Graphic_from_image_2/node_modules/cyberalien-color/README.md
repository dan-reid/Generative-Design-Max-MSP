# Why create yet another color library?

I needed library that:

* Had similar code on server side (PHP) and client side (browser).
* Had license compatible with commercial projects.

There was no library that matched these requirements.

This library is available in 2 languages to make it usable in both client side web components and server side scripts:

* PHP
* JavaScript, usable in Node.js and in browser. Browser version has no dependencies.

# Features

Library has only 1 object: Color

Color object represents color. You can:

* Set or get color and color components in RGB and HSL color spaces with optional alpha channel.
* Import/export color from/to different commonly used string formats: hexadecimal, IE hex, rgb(), hsl(), color keywords.
* Mix colors.
* Get luminance and calculate color contrast.

Class automatically converts between color spaces when needed.

Code is optimized for performance. Unusual coding style was used to make code consistent between different programming languages.

# Usage

How to include library:

    // For Node.js
    const CAColor = require('cyberalien-color');
        
    // For browser (change path to correct url)
    // <script src="./dist/color-es5.js"></script>

Sample code:

    var color, color2;
        
    // Create simple color object, get HEX string
    color = new CAColor();
    color.setRGB(10, 20, 30);
    color.toHex();
        
    // Create color object from string
    color = CAColor.fromString('rgba(10, 20, 30, .5)');
    color.getRGBA();
        
    // Change color components in different color spaces
    color = CAColor.fromString('#f00');
    color.setHue(180);
    color.toString(); // '#00ffff'
    color.toHex(true); // '#0ff' - compressed hex string
     
    // Mix colors
    color = CAColor.fromString('blue');
    color2 = CAColor.fromString('red');
    color.mix(color2, 50); // 50% of each color
    color.toKeyword(); // 'purple'
        
    // Manipulate color spaces
    color = CAColor.fromString('yellow');
    color.setHue(color.getHue() + 180);
    color.setLightness(25);
    color.toHex(); // '#000080'
    color.toHSLString(); // 'hsl(240, 100%, 25%)'
    
    // Calculate contrast between 2 colors
    color = CAColor.fromString('yellow');
    color2 = CAColor.fromString('darkblue');
    color.getContrast(color2); // 14.245...
    

# Documentation

Documentation will be added later, when new website is ready.

For now you can easily figure it out by reading function names and docblocks in src/color.js or lib/color.php. 
Code is well documented.

Color values use following ranges:
* red, green, blue: 0-255
* hue: 0-360
* lightness, saturation: 0-100
* alpha: 0-1

# Requirements

JavaScript library is written in ES6, but is compiled into ES5 code for older browsers.

PHP library requires PHP 5.4 or newer version.

# Compiling library

To re-compile library you need Node.js. Open Terminal or command prompt, run these commands:

    npm install
    grunt

First command will install all necessary libraries.
Second command will compile libraries.

If you are having problems getting Grunt to execute, install it globally:

    npm install -g grunt

# Unit tests

To run tests run this command:

    npm test

# License

This library is licensed under MIT license. That means you can use it in both open source and commercial projects.
