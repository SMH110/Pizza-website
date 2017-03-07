process.env.IS_TEST_ENVIRONMENT = "TRUE";

const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    output: {
        path: './dist',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
});
