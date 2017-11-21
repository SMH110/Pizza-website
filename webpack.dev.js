process.env.IS_TEST_ENVIRONMENT = "TRUE";

const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const root = require('./webpack-helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map'
});
