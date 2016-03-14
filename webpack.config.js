/*
 * @Author: detailyang
 * @Date:   2016-03-02 15:21:55
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T16:52:04+08:00
 */


const path = require('path');

module.exports = {
  entry: {
    index: './static/src/index.js',
    oauth: './static/src/oauth.js',
    authorize: './static/src/authorize.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'static/build/'),
    publicPath: '/build',
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports'],
      },
    }],
  },
};
