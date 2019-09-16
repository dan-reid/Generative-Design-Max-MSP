/**
 * This file is part of the simple-css-tokenizer package.
 *
 * (c) Vjacheslav Trushkin <cyberalien@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

/**
 * Parse error class
 */
class ParseError {
    /**
     * Constructor
     *
     * @param {string} message Error message
     * @param {string} css CSS
     * @param {number} index Index where error occurred, -1 if n/a
     */
    constructor(message, css, index) {
        this.message = message;

        if (typeof index === 'number' && index !== -1) {
            let start = index;

            // Check for space on left side of remaining code to calculate line start correctly
            let remaining = css.slice(index) + '!';
            let trimmed = remaining.trim();
            let end = start + remaining.length - trimmed.length;

            let code = css.slice(0, end);
            let line = code.length - code.replace(/\n/g, '').length + 1;
            this.message += ' on line ' + line;
        }
    }

    /**
     * Get message
     *
     * @returns {string}
     */
    getMessage() {
        return this.message;
    }
}

module.exports = ParseError;
