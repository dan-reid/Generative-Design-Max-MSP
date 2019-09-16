/**
 * This file is part of the simple-css-tokenizer package.
 *
 * (c) Vjacheslav Trushkin <cyberalien@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

const ParseError = require('./error');
const Builder = require('./builder');

/**
 * Class that converts css code into list or tree of tokens
 */
class Tokenizer {
    /**
     * Convert list or tree of tokens to string
     *
     * @param {Array} tokens
     * @param {object} [options]
     * @returns {string}
     */
    static build(tokens, options) {
        return (new Builder(options)).build(tokens);
    }

    /**
     * Constructor
     *
     * @param {object} [options]
     */
    constructor(options) {
        options = options === void 0 ? {} : options;

        this.splitRules = options.splitRules !== false;
        this.ignoreErrors = options.ignoreErrors !== false;
        this.lessSyntax = options.lessSyntax === true;
        this.ruleModifiers = options.ruleModifiers !== void 0 ? options.ruleModifiers : ['default', 'important'];
    }

    /**
     * Get tokens as tree
     *
     * @param {string} css
     * @returns {Array}
     */
    tree(css) {
        // Do stuff
        this._tokens = this.tokenize(css);
        let results = this._parseTokens(this._tokens.shift());

        // Add remaining items to root element
        while (this._tokens.length) {
            if (!this.ignoreErrors) {
                this.errors.push(new ParseError('Unmatched }', this._css, this._tokens[0].index));
            }
            results = results.concat(this._parseTokens(this._tokens.shift()));
        }

        return results;
    }

    /**
     * Convert css into list of tokens
     *
     * @param {string} css
     * @returns {Array}
     */
    tokenize(css) {
        this._css = css;
        this._cssLC = css.toLowerCase();
        this.errors = [];

        let start = 0,
            words = [],
            items = [],
            depth = 0,
            functionDepth = 0,
            expressionDepth = 0,
            blockStart = 0,
            selectorStart = 0,
            error = false, // used to track invalid items
            cssLength = this._css.length;

        let validTokens = ['"', "'", '/*', '{', '}', ';', 'url(', '\\'];
        if (this.lessSyntax) {
            validTokens = validTokens.concat(['(', ')', '//', '@{', '#{']);
        }

        this._findTokens(validTokens).forEach(token => {
            if (token.index < start) {
                return;
            }

            let end;

            switch (token.token) {
                case '//':
                    // Skip to end of line
                    words.push({
                        type: 'text',
                        text: this._css.slice(start, token.index),
                        index: start
                    });
                    start = token.index;

                    let end1 = this._css.indexOf('\n', start + 2);
                    let end2 = this._css.indexOf('\r', start + 2);
                    end = end1 === -1 ? end2 : (end2 === -1 ? end1 : Math.min(end1, end2));
                    if (end === -1) {
                        // Last string
                        start = cssLength;
                        break;
                    }

                    start = end + 1;
                    break;

                case '/*':
                    // Skip to end of comment
                    words.push({
                        type: 'text',
                        text: this._css.slice(start, token.index),
                        index: start
                    });
                    start = token.index;

                    end = this._css.indexOf('*/', start + 2);
                    if (end === -1) {
                        // Skip to end of file
                        if (!this.ignoreErrors) {
                            this.errors.push(new ParseError('Missing comment closing statement', this._css, start));
                            error = true;
                        }
                        start = cssLength;
                        break;
                    }

                    start = end + 2;
                    break;

                case '\\':
                    // Escaped character, skip next character
                    words.push({
                        type: 'text',
                        text: this._css.slice(start, token.index + 2),
                        index: start
                    });
                    start = token.index + 2;
                    break;

                case 'url(':
                    words.push({
                        type: 'text',
                        text: this._css.slice(start, token.index),
                        index: start
                    });
                    start = token.index;

                    // Skip to end of URL
                    end = this._findEndOfURL(start);
                    if (typeof end !== 'number') {
                        // Invalid URL - skip "url"
                        words.push({
                            type: 'text',
                            text: this._css.slice(start, start + 3),
                            index: start
                        });
                        if (!this.ignoreErrors) {
                            this.errors.push(new ParseError('Incomplete URL', this._css, start));
                            error = true;
                        }
                        start += 3;
                        break;
                    }
                    words.push({
                        type: 'url',
                        text: this._css.slice(start, end),
                        index: start
                    });
                    start = end;
                    break;

                case '"':
                case "'":
                    words.push({
                        type: 'text',
                        text: this._css.slice(start, token.index),
                        index: start
                    });
                    start = token.index;

                    // Skip to end of quoted string
                    end = this._findEndOfQuotedString(token.token, start);
                    if (end === false) {
                        // Missing closing quote
                        if (this.ignoreErrors) {
                            words.push({
                                type: 'text',
                                text: this._css.slice(start, start + 1),
                                index: start
                            });
                            start ++;
                        } else {
                            this.errors.push(new ParseError('Missing closing ' + token.token, this._css, start));
                            error = true;
                            words.push({
                                type: 'code',
                                text: this._css.slice(start),
                                index: start
                            });
                            start = cssLength;
                        }
                        break;
                    }
                    words.push({
                        type: 'string',
                        text: this._css.slice(start, end),
                        index: start
                    });
                    start = end;
                    break;

                case ';':
                    if (functionDepth > 0) {
                        break;
                    }
                    if (this.splitRules) {
                        words.push({
                            type: 'text',
                            text: this._css.slice(start, token.index),
                            index: start
                        });
                        items.push(this._checkRule(words, token.token, error));
                        if (error) {
                            items[items.length - 1].error = true;
                            error = false;
                        }
                    }
                    selectorStart = start = token.index + 1;
                    words = [];
                    break;

                case '{':
                    // Get selector
                    if (!this.splitRules) {
                        if (selectorStart > blockStart) {
                            let code = this._css.slice(blockStart, selectorStart).trim();
                            if (code.length) {
                                items.push({
                                    token: 'code',
                                    code: code,
                                    index: blockStart,
                                });
                                if (error) {
                                    items[items.length - 1].error = true;
                                    error = false;
                                }
                            }
                        }
                    }
                    words.push({
                        type: 'text',
                        text: this._css.slice(start, token.index),
                        index: start
                    });
                    items.push(this._checkSelectors(words));
                    if (error) {
                        items[items.length - 1].error = true;
                        error = false;
                    }

                    blockStart = selectorStart = start = token.index + 1;
                    words = [];
                    depth ++;
                    break;

                case '}':
                    if (expressionDepth > 0) {
                        // LESS/SASS expression
                        if (expressionDepth === 1 && this.splitRules) {
                            // Find start of expression
                            let found = false,
                                text = this._css.slice(start, token.index + 1);

                            for (let i = words.length - 1; i >= 0; i --) {
                                if (words[i].beforeExpression) {
                                    found = true;
                                    delete words[i].beforeExpression;
                                    if (i === words.length - 1) {
                                        // Previous token starts expression - do not change word tokens
                                        words.push({
                                            type: 'expression',
                                            text: text,
                                            index: start
                                        });
                                    } else {
                                        // Merge with previous tokens
                                        start = words[i + 1].index;
                                        words = words.slice(0, i + 1);
                                        words.push({
                                            type: 'expression',
                                            text: text,
                                            index: start
                                        });
                                    }
                                    break;
                                }
                                text = words[i].text + text;
                            }
                            if (!found) {
                                words.push({
                                    type: 'expression',
                                    text: text,
                                    index: start,
                                    error: true
                                });
                            }
                            start = token.index + 1;
                        }
                        expressionDepth --;
                        break;
                    }
                    // End of block
                    if (this.splitRules) {
                        words.push({
                            type: 'text',
                            text: this._css.slice(start, token.index),
                            index: start
                        });
                        items.push(this._checkRule(words, '', error));
                        if (error) {
                            items[items.length - 1].error = true;
                        }
                    } else {
                        let code = this._css.slice(blockStart, token.index).trim();
                        if (code.length) {
                            items.push({
                                token: 'code',
                                code: code,
                                index: blockStart
                            });
                            if (error) {
                                items[items.length - 1].error = true;
                            }
                        }
                    }
                    error = false;
                    items.push({
                        token: '}',
                        index: token.index
                    });
                    error = false;

                    if (!depth && !this.ignoreErrors) {
                        this.errors.push(new ParseError('Unexpected }', this._css, token.index));
                    }
                    depth --;

                    blockStart = selectorStart = start = token.index + 1;
                    words = [];
                    functionDepth = 0;
                    break;

                case '(':
                    // Function with LESS syntax enabled
                    if (this.splitRules) {
                        let row = {
                            type: 'text',
                            text: this._css.slice(start, token.index),
                            index: start
                        };
                        if (!functionDepth) {
                            row.beforeFunction = true;
                        }
                        words.push(row);
                        start = token.index;
                    }
                    functionDepth ++;
                    break;

                case ')':
                    // End of function with LESS syntax enabled
                    if (functionDepth === 1 && this.splitRules) {
                        // Find start of function
                        let found = false,
                            text = this._css.slice(start, token.index + 1);

                        for (let i = words.length - 1; i >= 0; i --) {
                            if (words[i].beforeFunction) {
                                found = true;
                                delete words[i].beforeFunction;
                                if (i === words.length - 1) {
                                    // Previous token starts function - do not change word tokens
                                    words.push({
                                        type: 'function',
                                        text: text,
                                        index: start
                                    });
                                } else {
                                    // Merge with previous tokens
                                    start = words[i + 1].index;
                                    words = words.slice(0, i + 1);
                                    words.push({
                                        type: 'function',
                                        text: text,
                                        index: start
                                    });
                                }
                                break;
                            }
                            text = words[i].text + text;
                        }
                        if (!found) {
                            words.push({
                                type: 'function',
                                text: text,
                                index: start,
                                error: true
                            });
                        }
                        start = token.index + 1;
                    }
                    functionDepth --;
                    if (functionDepth < 0) {
                        functionDepth = 0;
                    }
                    break;

                case '@{':
                case '#{':
                    // Expression with LESS/SASS syntax enabled
                    if (this.splitRules) {
                        let row = {
                            type: 'text',
                            text: this._css.slice(start, token.index + 2),
                            index: start,
                        };
                        if (!expressionDepth) {
                            row.beforeExpression = true;
                        }
                        words.push(row);
                        start = token.index + 2;
                    }
                    expressionDepth ++;
                    break;
            }
        });

        if (depth > 0 && !this.ignoreErrors) {
            this.errors.push(new ParseError('Missing }', this._css, cssLength));
        }

        // Add remaining code
        if (this.splitRules) {
            words.push({
                type: 'text',
                text: this._css.slice(start),
                index: start
            });
            items.push(this._checkRule(words, '', error));
            if (error) {
                items[items.length - 1].error = true;
            }
        } else {
            let code = this._css.slice(blockStart).trim();
            if (code.length) {
                items.push({
                    token: 'code',
                    code: code,
                    index: blockStart
                });
                if (error) {
                    items[items.length - 1].error = true;
                }
            }
        }
        return items.filter(row => row !== false);
    }

    /**
     * Find tokens in code
     *
     * @param {Array} tokens Array of tokens
     * @returns {Array}
     */
    _findTokens(tokens) {
        let list = [];

        tokens.forEach(token => {
            let index = 0;
            while (true) {
                index = this._cssLC.indexOf(token, index);
                if (index === -1) {
                    return;
                }
                list.push({
                    token: token,
                    index: index
                });
                index ++;
            }
        });

        list.sort((a, b) => a.index - b.index);
        return list;
    }

    /**
     * Find end of quoted string
     *
     * @param {string} quote Quote character
     * @param {number} start Position of first quote
     * @returns {number|boolean} Position of character after end of string, false if string is broken
     */
    _findEndOfQuotedString(quote, start) {
        let nextEscape = this._css.indexOf('\\', start + 1),
            end = this._css.indexOf(quote, start + 1);

        if (end === -1) {
            // Invalid string
            return false;
        }

        while (nextEscape !== -1 && nextEscape < end) {
            if (end === nextEscape + 1) {
                end = this._css.indexOf(quote, end + 1);
                if (end === -1) {
                    // Invalid string
                    return false;
                }
            }
            nextEscape = this._css.indexOf('\\', nextEscape + 2);
        }

        return end + 1;
    }

    /**
     * Find end of url
     *
     * @param {number} start
     * @returns {number|ParseError} Position of character after end of url() or error message
     */
    _findEndOfURL(start) {
        let index = (start || 0) + 4,
            length = this._css.length,
            next, end;

        while (index < length) {
            next = this._css.charAt(index);
            switch (next) {
                case '"':
                case "'":
                    // quoted url
                    end = this._findEndOfQuotedString(next, index);
                    if (end === false) {
                        return new ParseError('Incomplete string', this._css, index);
                    }
                    end = this._css.indexOf(')', end);
                    return end === -1 ? new ParseError('Cannot find end of URL', this._css, start) : end + 1;

                case ' ':
                case '\t':
                case '\r':
                case '\n':
                    // skip whitespace
                    index ++;
                    break;

                default:
                    // unquoted url
                    while (true) {
                        switch (next) {
                            case ')':
                                return index + 1;

                            case '"':
                            case "'":
                            case '(':
                            case ' ':
                            case '\t':
                            case '\r':
                            case '\n':
                                return new ParseError('Invalid URL', this._css, start);

                            default:
                                if (this._css.charCodeAt(index) < 32) {
                                    return new ParseError('Invalid URL', this._css, start);
                                }
                        }
                        index ++;
                        if (index >= length) {
                            return new ParseError('Cannot find end of URL', this._css, start);
                        }
                        next = this._css.charAt(index);
                    }
            }
        }
        return new ParseError('Cannot find end of URL', this._css, start);
    }


    /**
     * Check for valid css rule, return either code or rule token
     *
     * @param {Array} words Array of words
     * @param {string} extra Additional text to add if returning code
     * @param {boolean} ignoreErrors True if errors should be ignored
     * @returns {Object|boolean}
     * @private
     */
    _checkRule(words, extra, ignoreErrors) {
        let pairs = this._findRulePairs(words),
            value, index;

        if (typeof pairs === 'boolean') {
            value = this._mergeWords(words) + extra;
            if (!value.length) {
                return false;
            }

            index = words[0].index;
            if (pairs === false && !this.ignoreErrors && !ignoreErrors) {
                this.errors.push(new ParseError('Invalid css rule', this._css, index));
            }
            return {
                token: 'code',
                code: value,
                index: index
            };
        }
        return pairs;
    }

    /**
     * Merge words list to string
     *
     * @param {Array} words
     * @returns {string}
     * @private
     */
    _mergeWords(words) {
        return words.map(word => word.text).join('').trim();
    }

    /**
     * Get token with selectors list
     *
     * @param {Array} words
     * @returns {Object}
     * @private
     */
    _checkSelectors(words) {
        let selectors = this._getSelectors(words),
            result = {
                token: '{',
                code: this._mergeWords(words),
                index: words[0].index
            };

        if (!selectors.length) {
            return result;
        }

        if (selectors[0].charAt(0) === '@') {
            result.atRule = selectors[0].split(/\s+/, 1)[0].slice(1);
            selectors[0] = selectors[0].slice(1 + result.atRule.length).trim();
            result.atValues = selectors;
        } else {
            result.selectors = selectors;
        }

        return result;
    }

    /**
     * Get list of selectors from list of words
     *
     * @param {Array} words
     * @returns {Array}
     * @private
     */
    _getSelectors(words) {
        let selectors = [],
            selector = '';

        words.forEach(word => {
            if (word.type !== 'text') {
                selector += word.text;
                return;
            }

            let list = word.text.split(',');
            selector += list.shift();
            while (list.length > 0) {
                selectors.push(selector.trim());
                selector = list.shift();
            }
        });

        selectors.push(selector.trim());

        return selectors.filter(item => item.length > 0);
    }

    /**
     * Get key/value pairs from list of words
     *
     * @param {Array} words
     * @returns {Object|boolean}
     * @private
     */
    _findRulePairs(words) {
        let key = '',
            value = '',
            isKey = true,
            error = false,
            hasFunction = false,
            result;

        words.forEach(word => {
            if (error) {
                return;
            }

            if (word.type !== 'text') {
                if (isKey) {
                    if (!this.lessSyntax) {
                        // Cannot have URL or quoted string in key
                        error = true;
                        return;
                    }

                    // Check for function
                    if (word.type === 'function') {
                        hasFunction = true;
                    }
                    key += word.text;
                    return;
                }
                value += word.text;
                return;
            }

            let pairs = word.text.split(':');
            if (this.lessSyntax && pairs.length > 1) {
                // Check for "&:extend" LESS syntax
                pairs.forEach((item, index) => {
                    if (index > 0 && (item === 'extend' || item.slice(0, 7) === 'extend(')) {
                        pairs[index - 1] += ':' + pairs[index];
                        pairs[index] = null;
                    }
                });
                pairs = pairs.filter(item => item !== null);
            }

            if (pairs.length > 2) {
                error = true;
                return;
            }
            if (pairs.length === 2) {
                if (!isKey) {
                    error = true;
                    return;
                }
                key += pairs[0];
                value = pairs[1];
                isKey = false;
                return;
            }
            if (isKey) {
                key += word.text;
            } else {
                value += word.text;
            }
        });

        if (error) {
            return false;
        }
        if (isKey) {
            // True if token should be treated as code
            return this.lessSyntax ? hasFunction || key.trim().slice(0, 1) === '@' : false;
        }

        key = key.trim();
        value = value.trim();
        if (!key.length || !value.length) {
            return false;
        }

        result = {
            token: 'rule',
            key: key,
            value: value,
            index: words[0].index
        };

        this.ruleModifiers.forEach(word => {
            if (result.value.slice(0 - word.length - 1).toLowerCase() === '!' + word) {
                result[word] = true;
                result.value = result.value.slice(0, result.value.length - word.length - 1).trim();
            }
        });
        if (!result.value.length) {
            return false;
        }

        return result;
    }


    /**
     * Convert to tree
     *
     * @param item
     * @returns {Array}
     * @private
     */
    _parseTokens(item) {
        let results = [];

        while (item !== void 0) {
            switch (item.token) {
                case '}':
                    return results;

                case '{':
                    item.children = this._parseTokens(this._tokens.shift());
                    results.push(item);
                    break;

                default:
                    results.push(item);
            }

            item = this._tokens.shift();
        }
        return results;
    }
}

module.exports = Tokenizer;
