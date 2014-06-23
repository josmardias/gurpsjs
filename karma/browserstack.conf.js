/* jshint node: true */
'use strict';
module.exports = function (config) {
  config.set({
    reporters: ['dots'],

    browserStack: {
      project: 'gurps.js',
      startTunnel: true,
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY
    },
    customLaunchers: {
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '21.0',
        os: 'OS X',
        os_version: 'Mountain Lion'
      }
    },
    browsers: ['bs_firefox_mac']
  });
};
