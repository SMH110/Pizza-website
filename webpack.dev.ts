import * as webpackMerge from 'webpack-merge';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import commonConfig from './webpack.common';

export = webpackMerge(commonConfig, {
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
