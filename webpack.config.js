/*
 * @Author: detailyang
 * @Date:   2016-03-02 15:21:55
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 16:58:13
 */

'use strict';
var path = require('path');
module.exports = {
    entry: {
        index: './static/src/index.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'static/build/'),
        publicPath: "/build",
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['add-module-exports']
            }
        }]
    }
}
