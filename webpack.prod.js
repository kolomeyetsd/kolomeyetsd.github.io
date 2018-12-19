//
const webpack = require('webpack')
const devConfig = require('./webpack.dev')


module.exports = {
  ...devConfig,
  devtool: false,
  watch: false,
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
  ]
}
