const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const root = require('./webpack-helpers');

module.exports = {
    entry: {
        polyfills: './front-end/polyfills.ts',
        vendor: './front-end/vendor.ts',
        app: './front-end/main.ts',
        analytics: './front-end/analytics.js',
        styles: './front-end/styles.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './front-end/', // location of your src
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: './front-end/index.html'
        }),
        new CopyWebpackPlugin([
            { from: root('front-end', 'images'), to: 'images' }
        ]),
        new webpack.EnvironmentPlugin({
            'ENV': 'development',
            'IS_TEST_ENVIRONMENT': 'FALSE'
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: root('front-end', 'compile.json') }
                }]
            },
            {
                test: /\.component\.ts$/,
                loaders: ['angular2-template-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.[s]?css$/,
                exclude: root('front-end', 'app'),
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap!sass-loader' })
            },
            {
                test: /\.[s]?css$/,
                include: root('front-end', 'app'),
                loader: 'raw-loader!sass-loader'
            }
        ]
    }
};
