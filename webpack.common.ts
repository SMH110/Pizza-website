import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { root } from './webpack-helpers';

export default {
    entry: {
        polyfills: './front-end/polyfills.js',
        vendor: './front-end/vendor.js',
        app: './front-end/main.js',
        analytics: './front-end/analytics.js',
        styles: './front-end/styles.js'
    },
    resolve: {
        extensions: ['.js']
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
        ])
    ],
    module: {
        rules: [
            {
                test: /\.component\.js$/,
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
                test: /\.css$/,
                exclude: root('front-end', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: root('front-end', 'app'),
                loader: 'raw-loader'
            }
        ]
    }
};
