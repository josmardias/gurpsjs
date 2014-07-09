/* jshint node: true */
"use strict";
module.exports = function (config) {
  var isCI = process.env.CONTINUOUS_INTEGRATION === "true";

  config.set({
    reporters: ["dots", "coverage"],

    preprocessors: {
      "src/!(polyfill).js": ["coverage"] //all but polyfill.js
    },
    coverageReporter: {
      reporters: [{
        type: isCI ? "lcovonly" : "lcov",
        dir: "coverage/"
      }, {
        type: "text"
      }],
    },

    browsers: ["PhantomJS"]
  });
};
