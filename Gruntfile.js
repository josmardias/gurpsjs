module.exports = function (grunt) {
  "use strict";

  var taskList = [
    "grunt-contrib-watch",
    "grunt-contrib-clean",
    "grunt-browserify",
    "grunt-karma"
  ];

  var jsFiles = [
    "Gruntfile.js",
    "src/**/*.js",
    "tests/**/*.js",
    "karma/**/*.js"
  ];

  var jsonFiles = [
    "bower.json",
    "package.json"
  ];

  var config = {};

  try {
    config.pkg = grunt.file.readJSON("package.json");
  } catch (ignore) {
    grunt.log.error("Failed to load package.json properties");
  }

  /* Watch
   * https://github.com/gruntjs/grunt-contrib-watch
   ----------------------------------------------------------------------- */

  config.watch = {};

  config.watch.files = jsFiles.concat(jsonFiles);

  config.watch.tasks = ["test"];

  /* Browserify
   * https://github.com/jmreidy/grunt-browserify
   ----------------------------------------------------------------------- */

  config.browserify = {};

  config.browserify.options = {
    browserifyOptions: {
      debug: true
    }
  };

  config.browserify.src = {
    src: "./src/gurps.js",
    dest: "./build/src-bundle.js"
  };

  config.browserify.test = {
    src: "./tests/**/*.js",
    dest: "./build/test-bundle.js"
  };

  /* Clean
   * https://github.com/gruntjs/grunt-contrib-clean
   ----------------------------------------------------------------------- */

  config.clean = {};

  config.clean.build = ["lib"];

  /* Karma
   * https://github.com/karma-runner/grunt-karma
   ----------------------------------------------------------------------- */

  config.karma = {};

  config.karma.options = {
    basePath: "..", //default is configFile path
    files: ["build/test-bundle.js"],
    frameworks: ["mocha"]
  };

  config.karma.browserstack = {
    configFile: "karma/browserstack.conf.js"
  };

  config.karma.browsers = {
    configFile: "karma/browsers.conf.js"
  };

  config.karma.debug = {
    configFile: "karma/debug.conf.js"
  };

  config.karma.test = {
    configFile: "karma/test.conf.js"
  };

  config.karma.coverage = {
    configFile: "karma/coverage.conf.js"
  };

  /*
   * Configuration
   ----------------------------------------------------------------------- */

  grunt.initConfig(config);

  taskList.forEach(grunt.loadNpmTasks);

  /*
   * Tasks
   ----------------------------------------------------------------------- */

  function task (name, tasks) {
    grunt.registerTask(name, tasks);
  }

  //test
  task("test", ["jasmine_node:test"]);
  task("coverage", ["jasmine_node:coverage"]); //travis.sh
  task("browserstack", ["browser-test-bundle", "karma:browserstack"]); // travis.sh
  task("browsers", ["browser-test-bundle", "karma:browsers"]);

  //build
  task("browser-bundle", ["browserify:src"]);
  task("browser-test-bundle", ["browserify:test"]);
  //task("clean", ["clean:build"]);

  //develop
  task("dev", ["watch"]);
  task("debug", ["browser-test-bundle", "karma:debug"]);

};
