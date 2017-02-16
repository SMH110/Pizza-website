import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import commonConfig from './webpack.common';

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

export = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: './dist',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            },
            comments: false
        }),
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        })
    ]
});
