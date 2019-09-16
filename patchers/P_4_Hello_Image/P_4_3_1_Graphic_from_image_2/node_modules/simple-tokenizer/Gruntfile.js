"use strict";

// Node modules
const fs = require('fs'),
    path = require('path'),
    glob = require('glob');

// List of source files
const sources = [
    'error.js',
    'builder.js',
    'tokenizer.js'
];

// List of directories
const testsDir = 'tests',
    srcDir = 'src',
    distDir = 'dist';

// Library name
const libraryName = 'tokenizer';

// Output banner and footer
const banner = '/**\n' +
        ' * This file is part of the simple-css-tokenizer package.\n' +
        ' *\n' +
        ' * (c) Vjacheslav Trushkin <cyberalien@gmail.com>\n' +
        ' *\n' +
        ' * For the full copyright and license information, please view the LICENSE\n' +
        ' * file that was distributed with this source code.\n' +
        ' */\n',
    bannerBrowser = banner +
        '\n' +
        '"use strict";\n\n' +
        '((_global) => {\n' +
        '    var modules = {};\n\n',
    footer = '\n\n    // Export to global namespace\n' +
        '    _global.CATokenizer = modules.Tokenizer;\n' +
        '\n' +
        '})(typeof window !== "undefined" ? window : (typeof WorkerGlobalScope !== "undefined" ? self : (typeof global !== "undefined" ? global : Function("return this;")())));\n';

// List of test files
let tests = {
    // List of tests in order they should run.
    // Script will scan for missing files and append them to list.
    tokenizer: [],
};

/**
 * Find missing files
 *
 * @param {string} path Directory to check
 * @param {Array} files List of known files
 * @returns {Array}
 */
function findMissingFiles(path, files) {
    let start = path.length + 1;

    glob.sync(path + '/**', {nodir: true}).forEach(file => {
        file = file.slice(start);
        if (files.indexOf(file) === -1) {
            files.push(file);
        }
    });

    return files;
}

/**
 * Convert filename to key
 *
 * @param filename
 * @returns {string}
 */
function sourceToKey(filename) {
    filename = path.normalize(filename).slice(srcDir.length + 1);
    return filename.split('.')[0].split(/[/_]/).map(item => item.slice(0, 1).toUpperCase() + item.slice(1)).join('');
}

/**
 * Remove header from .js file before merging it into one big file
 *
 * @param {string} str
 * @param {string} file
 * @returns {string}
 */
function parseFile(str, file) {
    // Remove header
    let pos = str.indexOf('"use strict";');
    str = pos === -1 ? str : str.slice(pos + 13);

    // Remove node-only code
    let start = 0;
    while ((pos = str.indexOf('// NODE ONLY', start)) !== -1) {
        let end = str.indexOf('///NODE ONLY', pos);
        if (end === -1) {
            break;
        }
        str = str.slice(0, pos) + str.slice(end + 13);
        start = pos;
    }

    // Change require
    start = 0;
    let dir = path.dirname(file);
    dir = dir.length ? dir + '/' : '';
    while ((pos = str.indexOf('require(', start)) !== -1) {
        let end = str.indexOf(')', pos);
        if (end === -1) {
            console.log('Error parsing require() in ' + file);
            throw new Error('Error parsing require() in ' + file);
        }
        let url = str.slice(pos + 8, end).trim();
        if (url[0] !== '"' && url[0] !== "'") {
            console.log('Error parsing require() in ' + file);
            throw new Error('Error parsing require() in ' + file);
        }

        url = path.normalize(dir + url.slice(1, url.length - 1));
        let replacement = 'modules[\'' + sourceToKey(url) + '\']';

        str = str.slice(0, pos) + replacement + str.slice(end + 1);

        start = pos + replacement.length;
    }

    // Change module.exports
    str = str.replace('module.exports =', 'modules[\'' + sourceToKey(file) + '\'] =');

    return str;
}

// Do Grunt stuff
module.exports = function(grunt) {
    let config = {
        clean: [distDir, testsDir + '/browser.js'],
        concat: {
            options: {
                banner: bannerBrowser,
                footer: footer,
                process: (src, filepath) =>
                "    (() => {\n" +
                "        " +
                parseFile(src, filepath).
                replace(/(\n)/g, "\n        ").
                trim() +
                "\n" +
                "    })();"
            },
            dist: {
                src: sources.map(file => srcDir + '/' + file),
                dest: distDir + '/full.js'
            }
        },
        'compile-es6': {
            options: {
                sourceMap: false,
                compact: false,
                comments: true,
                plugins: [
                    'transform-es2015-parameters',
                    'transform-es2015-destructuring',
                    ['transform-es2015-arrow-functions', { 'spec': false }]
                ]
            },
            dist: {
                files: {
                    [distDir + '/full/' + libraryName + '-es6.js']: distDir + '/full.js'
                }
            }
        },
        'compile-es6-min': {
            options: {
                sourceMap: false,
                compact: true,
                comments: false,
                plugins: [
                    'transform-es2015-parameters',
                    'transform-es2015-destructuring',
                    ['transform-es2015-arrow-functions', { 'spec': false }]
                ]
            },
            dist: {
                files: {
                    [distDir + '/' + libraryName + '-es6.js']: distDir + '/full.js'
                }
            }
        },
        'compile-es5': {
            options: {
                presets: ["es2015"]
            },
            dist: {
                files: {
                    [distDir + '/full/' + libraryName + '-es5.js']: distDir + '/full.js'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    [distDir + '/' + libraryName + '-es5.js']: distDir + '/full/' + libraryName + '-es5.js'
                }
            }
        },
        watch: {
            dist: {
                files: [srcDir + '/**/*.js'],
                tasks: ['compile-main']
            }
        }
    };

    function loadTaskAs(task, key, names) {
        names.forEach(name => {
            grunt.loadNpmTasks(task);
            grunt.renameTask(key, name);
        });
    }

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Babel
    loadTaskAs('grunt-babel', 'babel', ['compile-es6', 'compile-es6-min', 'compile-es5']);

    // Cleanup
    grunt.registerTask('cleanup-es5', function() {
        let files = [distDir + '/full/' + libraryName + '-es5.js'],
            search1 = '"use strict";',
            search2 = '(function () {';

        files.forEach(filename => {
            // Move Babel stuff inside anonymous function
            let data = fs.readFileSync(filename, 'utf8'),
                start = data.indexOf(search1),
                end = data.indexOf(search2, start);

            if (start === -1 || end === -1) {
                return;
            }

            data = data.slice(0, start + search1.length).trim() + '\n\n' +
                search2 + '\n\n    ' +
                data.slice(start + search1.length, end).trim().replace(/(\n)/g, '\n    ') + '\n    ' +
                data.slice(end + search2.length);

            fs.writeFileSync(filename, data, 'utf8');
        });

        fs.unlinkSync(distDir + '/full.js');
    });

    // Add comments to minified files
    grunt.registerTask('cleanup-minified', function() {
        let files = [distDir + '/' + libraryName + '-es6.js', distDir + '/' + libraryName + '-es5.js'];

        files.forEach(filename => {
            let data = fs.readFileSync(filename, 'utf8');

            if (data.slice(0, 2) === '/*') {
                return;
            }
            fs.writeFileSync(filename, banner + data.trim() + '\n', 'utf8');
        });
    });

    // Create list of tests
    grunt.registerTask('compile-browser-tests', function() {
        let time = Date.now();

        fs.writeFileSync(testsDir + '/browser.js',
            '/* List of tests to open in browser. See tests.html in parent directory. */\n' +
            findMissingFiles(testsDir, [])
                .filter(file => file.slice(-8) === '_test.js')
                .map(name => 'document.write(\'<' + 'script src="' + testsDir + '/' + name + '?' + time + '"></' + 'script>\');')
                .join('\n') +
            '\n',
            'utf8'
        );
    });

    // Compilation
    grunt.registerTask('compile-main', ['concat', 'compile-es6']);
    grunt.registerTask('compile', ['clean', 'concat', 'compile-main', 'compile-es6-min', 'compile-es5', 'uglify', 'cleanup-es5', 'cleanup-minified', 'compile-browser-tests']);

    grunt.registerTask('test', 'compile-browser-tests');
    grunt.registerTask('default', 'compile');

    // Init configuration file
    grunt.initConfig(config);
};
