const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {    
    output: {
        path: helpers.root('..', '..', 'sberlifelk'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                ecma: 5,
                warnings: false,
                ie8: false,
                mangle: true,
                compress: {
                    pure_getters: true,
                    passes: 3
                },
                output: {
                    ascii_only: true,
                    comments: false
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new SpritesmithPlugin({
            src: {
                cwd: helpers.root('src', 'assets', 'i', 'operations'),
                glob: '*.png'
            },
            target: {
                image: helpers.root('..', '..', 'sberlifelk', 'assets', 'sprite.png'),
                css: helpers.root('..', '..', 'sberlifelk', 'sprite.css')
            },
            apiOptions: {
                cssImageRef: "assets/sprite.png"
            }
        })
    ]
});