/* jshint camelcase: false */
"use strict";
module.exports = function (config) {
  var buildName = process.env.TRAVIS_BUILD_NUMBER || process.env.USERNAME + "-" + Date.now();

  config.set({
    reporters: ["dots"],

    singleRun: true,

    browserDisconnectTimeout: 10 * 1000, // default 2 * 1000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10 * 1000
    captureTimeout: 4 * 60 * 1000, //default 60 * 000

    browserStack: {
      project: "gurps.js",
      build: buildName,
      startTunnel: true,
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY
    },

    customLaunchers: {
      bs_android: {
        base: "BrowserStack",
        os: "android",
        os_version: "4.2",
        device: "LG Nexus 4"
      },
      bs_ios: {
        base: "BrowserStack",
        os: "ios",
        os_version: "7.0",
        device: "iPhone 5S"
      },
      bs_opera_mobile: {
        base: "BrowserStack",
        os: "opera",
        os_version: "1280x800",
        device: "Samsung Galaxy Tab 10.1"
      },
      bs_opera_mac: {
        base: "BrowserStack",
        browser: "opera",
        os: "OS X",
        os_version: "Mavericks"
      },
      bs_safari_mac: {
        base: "BrowserStack",
        browser: "safari",
        os: "OS X",
        os_version: "Mavericks"
      },
      bs_chrome_mac: {
        base: "BrowserStack",
        browser: "chrome",
        os: "OS X",
        os_version: "Mavericks"
      },
      bs_firefox_mac: {
        base: "BrowserStack",
        browser: "firefox",
        os: "OS X",
        os_version: "Mavericks"
      },
      bs_ie10_win7: {
        base: "BrowserStack",
        browser: "ie",
        browser_version: "10.0",
        os: "Windows",
        os_version: "7"
      },
      "bs_ie11_win7": {
        base: "BrowserStack",
        browser: "ie",
        browser_version: "11.0",
        os: "Windows",
        os_version: "7"
      },
    },

    browsers: [
      "bs_android",
      "bs_ios",
      "bs_opera_mobile",
      "bs_opera_mac",
      "bs_safari_mac",
      "bs_chrome_mac",
      "bs_firefox_mac",
      "bs_ie10_win7",
      "bs_ie11_win7"
    ]
  });
};
