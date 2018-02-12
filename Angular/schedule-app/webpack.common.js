var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CompressionPlugin = require("compression-webpack-plugin");
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
// var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
var path = require('path');

var appRoot = helpers.root('src', 'app'); // путь до каталога приложения, относительно корневого каталога проекта
//var commonAppRoot = helpers.root('..', 'CommonComponents', 'src', 'app'); // путь до каталога приложения CommonComponents, относительно корневого каталога проекта
//var commonNodeModules = helpers.root('..', 'CommonComponents', 'node_modules'); // путь до каталога node_modules проекта CommonComponents, относительно корневого каталога проекта
//var configRoot = helpers.root('src', 'app', 'config'); // путь до каталога c файлами настроек
var rxPaths = require('rxjs/_esm5/path-mapping');

var commonAliases = {
    '@app': appRoot
};

var aliasConfig = Object.assign({}, rxPaths(), commonAliases);

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [appRoot, helpers.root('node_modules')], // массив имен каталогов, которые должны быть разрешены к текущему каталогу
        alias: aliasConfig
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('tsconfig.json') }
                    }, 'angular2-template-loader', 'angular-router-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.css$/,
                exclude: [appRoot],
                loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
            },
            {
                test: /\.scss$/,
                include: [
                    appRoot
                ],
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                include: [
                    appRoot
                ],
                loaders: ['to-string-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,  // moment locale load by mask
            /en|ru/                 // only en and ru
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            hash: true
        }),

        new ExtractTextPlugin('bundle.css'),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            Pikaday: 'pikaday',
            moment: 'moment'
        }),

        // new CopyWebpackPlugin([
        //     { from: 'src/assets/pdf', to: 'assets/pdf' },
        //     { from: commonAppRoot + '/../assets/fonts', to: 'assets/font' }
        // ], {
        //     copyUnmodified: true
        // }),

        new webpack.optimize.ModuleConcatenationPlugin()

    ]
};
