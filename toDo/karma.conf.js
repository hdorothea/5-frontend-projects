const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    files: [
      { pattern: 'spec/*.js' },
    ],

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    preprocessors: {
      // add webpack as preprocessor
      'spec/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  });
};