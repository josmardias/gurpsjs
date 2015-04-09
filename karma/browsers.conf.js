"use strict";
module.exports = function (config) {
  config.set({
    reporters: ["dots"],

    singleRun: true,

    browsers: [
      "PhantomJS",
      "Chrome",
      "Firefox"
    ]
  });
};
