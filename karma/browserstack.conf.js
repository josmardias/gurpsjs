/* jshint node: true */
'use strict';
module.exports = function (config) {
  var user = process.env.USERNAME,
    bs_user = process.env.BROWSERSTACK_USERNAME,
    travis_build = process.env.TRAVIS_BUILD_NUMBER;

  var buildName = bs_user + '/' + user,
    sessionName = travis_build || Date.now();

  config.set({
    reporters: ['dots'],

    browserStack: {
      project: 'gurps.js',
      build: buildName,
      name: sessionName,
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
