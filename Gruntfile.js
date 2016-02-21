module.exports = function (grunt) {
  "use strict";

  var taskList = [
    "grunt-contrib-clean",
    "grunt-browserify"
  ];

  var config = {};

  try {
    config.pkg = grunt.file.readJSON("package.json");
  } catch (ignore) {
    grunt.log.error("Failed to load package.json properties");
  }

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

  //build
  task("browser-bundle", ["browserify:src"]);
  task("browser-test-bundle", ["browserify:test"]);
  //task("clean", ["clean:build"]);

  //develop
  task("dev", ["watch"]);

};
