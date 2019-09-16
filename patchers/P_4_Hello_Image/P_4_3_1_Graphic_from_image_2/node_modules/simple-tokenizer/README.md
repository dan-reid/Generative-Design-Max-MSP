# Simple CSS tokenizer

This is a library for parsing stylesheets.

Unlike proper tokenizers, it is not designed for precision, it is designed for speed.

Code works in browser and in Node.js

## What does it do?

It takes css code, splits it into array of selector and rule tokens. It can also build css from array of tokens, that
can be used for stuff like simple nested css parser. 

## Usage

See unit tests for sample code.

This library was originally designed for private project, so there isn't much documentation.

## Building browser package

To build browser package run "grunt"

## License

This library is licensed under MIT license. That means you can use it in both open source and commercial projects.
