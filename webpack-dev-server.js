/*
* @Author: detailyang
* @Date:   2016-03-02 16:34:15
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-02 16:34:20
*/

'use strict';
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true,
  stats: { colors: true },
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(8080, '127.0.0.1', function(err,result) {
  if (err) {
    console.log(err);
  }
  console.log('Webpack Listening at 127.0.0.1:8080');
});