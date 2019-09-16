"use strict";

/**
 * Function to test for ES6 functions that are used by this library.
 * @returns {boolean} True if ES6 is supported
 */
function testES6() {
    function check(code) {
        try {
            eval(code);
        } catch (e) {
            return false;
        }
        return true;
    }

    return check('var foo=(a)=>a+1') &&
        check('let a=5') &&
        check('var t; class cl{constructor(){}} t=new cl()') &&
        check('((...p)=>{})(1, 2)') &&
        check('var a={["b"+1]:2};a.b1++');
}

/**
 * Example usage
 */
(function() {
    var es6 = testES6(),
        head = document.getElementsByTagName('head')[0],
        script;

    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'domain.com/lib/color-es' + (es6 ? '6' : '5') + '.js';
    head.appendChild(script);
})();
