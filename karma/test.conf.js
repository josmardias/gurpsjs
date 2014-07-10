/* jshint node: true */
"use strict";
module.exports = function (config) {
  config.set({
    reporters: ["dots"],
    browsers: ["PhantomJS"]
  });
};
