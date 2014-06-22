/* jshint node: true */
'use strict';
module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    reporters: ['dots'],

    browsers: [
      'PhantomJS',
      'Chrome',
      'Firefox'
    ]
  });
};
