//
const path = require('path')
const webpack = require('webpack')


module.exports = {
  entry: __dirname + '/src/index',
  output: {
    path: __dirname + '/public/dist',
    publicPath: '/public/',
    filename: 'build.js',
  },
  watch: true,
  watchOptions: { aggregateTimeout: 100 },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.jsx|js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: { port: 4326 }
}
