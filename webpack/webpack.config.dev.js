import { TREZOR_CONNECT_FILES, TREZOR_CONNECT_HTML, SRC, PORT } from './constants';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const extractLess = new ExtractTextPlugin({
    filename: './[name].[contenthash].css',
    // disable: process.env.NODE_ENV === 'development'
});

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        //'index': [ `${SRC}js/index.js`, `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&__webpack_public_path=http://webpack:${PORT}`]
        'index': [ `${SRC}js/index.js`, `webpack-hot-middleware/client?path=/__webpack_hmr`]
    },
    output: {
        filename: '[name].[hash].js',
        path: '/',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                loader: extractLess.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                loader: extractLess.extract({
                    use: [
                        { loader: 'css-loader' }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|gif|jpg)$/,
                loader: 'file-loader?name=./images/[name].[ext]'
            },
            {
                test: /\.(wasm)$/,
                loader: 'file-loader',
                query: {
                    name: 'js/[name].[ext]',
                },
            },
            {
                test: /\.json($|\?)/,
                loader: 'json-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file-loader',
                query: {
                    name: './fonts/[name].[hash].[ext]',
                },
            },
            
        ]
    },
    resolve: {
        modules: [SRC, 'node_modules'],
    },
    performance: {
        hints: false
    },
    plugins: [
        extractLess,
        
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: `${SRC}index.html`,
            filename: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            { from: `${TREZOR_CONNECT_FILES}coins.json`, to: './data/coins.json' },
            { from: `${TREZOR_CONNECT_FILES}releases-1.json`, to: './data/releases-1.json' },
            { from: `${TREZOR_CONNECT_FILES}latest.txt`, to: './data/latest.txt' },
            { from: `${TREZOR_CONNECT_FILES}config_signed.bin`, to: './data/config_signed.bin' },
            // { from: `${SRC}images/favicon.png` },
            // { from: `${SRC}images` },
        ]),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            PRODUCTION: JSON.stringify(false)
        }),
        new webpack.IgnorePlugin(/node-fetch/), // for trezor-link warning
    ],
    // ignoring "fs" import in fastxpub
    node: {
        fs: "empty"
    }
}
