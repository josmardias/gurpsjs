/* jshint node: true */
"use strict";
module.exports = function (config) {
  config.set({
    reporters: ["dots"],

    autoWatch: true,

    /* hack to make autoWatch work */
    usePolling: true
  });
};
