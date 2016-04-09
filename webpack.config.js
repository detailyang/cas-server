/*
 * @Author: detailyang
 * @Date:   2016-03-02 15:21:55
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T16:52:04+08:00
 */


const path = require('path')
const webpack = require('webpack')

var env = process.env.NODE_ENV

var config = {
  devtool: 'cheap-module-eval-source-map',
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
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config
