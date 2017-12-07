var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname,'js/app/index.js'),
  output: {
    filename: 'javascripts/bundle.js',
    path: path.join(__dirname + '../public')
  }
}