/* jshint node: true */
'use strict';
module.exports = function (config) {
  config.set({
    reporters: ['dots', 'coverage'],

    preprocessors: {
      "src/!(polyfill).js": ["coverage"] //all but polyfill.js
    },
    coverageReporter: {
      reporters: [{
        type: "lcovonly",
        dir: 'coverage/'
      }, {
        type: "text"
      }],
    },

    browsers: ['PhantomJS']
  });
};
