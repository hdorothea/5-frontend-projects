const path = require('path');
require('babel-polyfill');


module.exports = {
  entry: ['babel-polyfill', './app/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /.js?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.css']
  },
  devtool: 'source-map',
  watch: true
};
