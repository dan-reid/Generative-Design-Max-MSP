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
 * Class that converts tokens list or tree back to css
 */
class Builder {
    /**
     * Constructor
     *
     * @param {object} [options]
     */
    constructor(options) {
        options = options === void 0 ? {} : options;

        this.minify = options.minify === void 0 ? false : options.minify;
        this.tab = this.minify ? '' : (options.tab === void 0 ? '\t' : options.tab);
        this.newline = this.minify ? '' : (options.newline === void 0 ? '\n' : options.newline);
        this.newLineAfterSelector = options.newLineAfterSelector === void 0 ? true : options.newLineAfterSelector;
        this.ruleSeparator = this.minify ? ':' : ': ';
        this.selectorsSeparator = this.minify ? ',' : ', ';
        this.ruleModifiers = options.ruleModifiers !== void 0 ? options.ruleModifiers : ['default', 'important'];
    }

    /**
     * Convert list of tokens to string
     *
     * @param {Array} tokens
     * @returns {string}
     */
    build(tokens) {
        return this._build(tokens, '').trim();
    }

    /**
     * Convert list of tokens to string
     *
     * @param {Array} tokens
     * @param {string} space
     * @returns {string}
     * @private
     */
    _build(tokens, space) {
        let output = '',
            lastToken = false,
            level = 0;

        tokens.forEach(token => {
            switch (token.token) {
                case 'code':
                    output += space + token.code + this.newline;
                    break;

                case '}':
                    level --;
                    space = space.slice(this.tab.length);
                    output += space + '}' + this.newline;
                    break;

                case '{':
                    if (lastToken === '}') {
                        // Double new line between 2 items in same scope
                        output += this.newline;
                    }
                    if (token.selectors !== void 0) {
                        output += space + token.selectors.join(this.selectorsSeparator);
                    } else if (token.atRule !== void 0) {
                        output += space + '@' + token.atRule;
                        if (token.atValues && token.atValues.length) {
                            let values = token.atValues.join(this.selectorsSeparator);
                            output += values.length ? ' ' + values : '';
                        }
                    } else {
                        // Error - use code as backup
                        output += space + token.code;
                    }
                    output += (this.newLineAfterSelector ?
                            this.newline + space :
                            (this.minify ? '' : ' ')
                        ) + '{' + this.newline;
                    if (token.children) {
                        output += this._build(token.children, space + this.tab);
                        output += space + '}' + this.newline;
                    } else {
                        level ++;
                        space += this.tab;
                    }
                    break;

                case 'rule':
                    output += space + token.key + this.ruleSeparator + token.value;
                    this.ruleModifiers.forEach(mod => {
                        if (token[mod]) {
                            output += ' !' + mod;
                        }
                    });
                    output += ';' + this.newline;
                    break;
            }
            lastToken = token.token;
        });

        return output;
    }
}

module.exports = Builder;
