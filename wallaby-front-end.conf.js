const path = require('path');
const wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        'front-end/specs/**/*.spec.js'
    ],

    module: {
        loaders: [
            { test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.jpg$/, loader: 'raw-loader' }
        ]
    },

    resolve: {
        modules: [path.join(__dirname, 'front-end', 'node_modules')]
    }
});

module.exports = function (wallaby) {
    process.env.NODE_PATH += path.delimiter + path.join(wallaby.localProjectDir, 'front-end', 'node_modules');
    return {
        files: [
            { pattern: 'shared/**/*.ts', load: false },
            { pattern: 'shared/**/*.d.ts', ignore: true },
            { pattern: 'front-end/**/*.ts', load: false },
            { pattern: 'front-end/**/*.d.ts', ignore: true },
            { pattern: 'front-end/**/*.scss', load: false },
            { pattern: 'front-end/**/*.css', load: false },
            { pattern: 'front-end/**/*.html', load: false },
            { pattern: 'front-end/specs/**/*.ts', load: false },
            { pattern: 'front-end/specs/**/*.spec.ts', ignore: true }
        ],

        tests: [
            { pattern: 'front-end/specs/**/*.spec.ts', load: false }
        ],

        postprocessor: webpackPostprocessor,

        setup: function (wallaby) {
            window.__moduleBundler.loadTests();
        },

        env: {
            kind: 'electron'
        }
    };
};
