module.exports = function (grunt) {
  "use strict";

  var taskList = [
    "grunt-contrib-watch",
    "grunt-contrib-jshint",
    "grunt-jsonlint",
    "grunt-jscs",
    "grunt-contrib-clean",
    "grunt-browserify",
    "grunt-jsbeautifier",
    "grunt-jasmine-node-coverage",
    "grunt-karma",
  ];

  var jsFiles = [
    "Gruntfile.js",
    "src/**/*.js",
    "tests/**/*.js",
    "karma/**/*.js",
  ];

  var jsonFiles = [
    "bower.json",
    "package.json",
  ];

  var jsRcFiles = [
    ".jshintrc",
    ".jsbeautifyrc",
    "src/.jshintrc",
    "tests/.jshintrc",
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

  config.watch.files = jsFiles.concat(jsonFiles).concat(jsRcFiles);

  config.watch.tasks = ["test"];

  /* JSHint
   * https://github.com/gruntjs/grunt-contrib-jshint
   ----------------------------------------------------------------------- */

  config.jshint = {};

  config.jshint.files = jsFiles.concat(jsonFiles).concat(jsRcFiles);

  config.jshint.options = {
    force: true,
    extensions: ".js, .jshintrc, .jsbeautifyrc",
    jshintrc: true
  };

  /* Json Lint
   * https://github.com/brandonramirez/grunt-jsonlint
   ----------------------------------------------------------------------- */

  config.jsonlint = {};

  config.jsonlint.src = jsonFiles;

  /* JSCS
   * https://github.com/jscs-dev/grunt-jscs
   ----------------------------------------------------------------------- */

  config.jscs = {};

  config.jscs.src = jsFiles;

  config.jscs.options = {
    force: true
  };

  /* JS Beautifier
   * https://github.com/vkadam/grunt-jsbeautifier
   ----------------------------------------------------------------------- */

  config.jsbeautifier = {};

  config.jsbeautifier.write = {
    src: jsFiles,
    options: {
      config: ".jsbeautifyrc"
    }
  };

  config.jsbeautifier.verify = {
    src: jsFiles,
    options: {
      config: ".jsbeautifyrc",
      mode: "VERIFY_ONLY"
    }
  };

  /* Browserify
   * https://github.com/jmreidy/grunt-browserify
   ----------------------------------------------------------------------- */

  config.browserify = {};

  config.browserify.options = {
    debug: true
  };

  config.browserify.src = {
    src: "./src/gurps.js",
    dest: "./build/src-bundle.js"
  };

  config.browserify.test = {
    options: {
      external: ["./src/**/*.js"],
    },
    src: "./tests/**/*.js",
    dest: "./build/test-bundle.js"
  };

  /* Jasmine Node
   * https://github.com/jribble/grunt-jasmine-node-coverage
   ----------------------------------------------------------------------- */

  config.jasmine_node = {};

  config.jasmine_node.test = {
    options: {
      captureExceptions: true,
      coverage: false,
      forceExit: true,
      isVerbose: false,
      specFolders: ["tests"],
      showColors: true
    },
    src: ["src/**/*.js"]
  };

  config.jasmine_node.coverage = {
    options: {
      captureExceptions: true,
      coverage: {
        print: "none", // none, summary, detail, both
        reportDir: "coverage",
        report: ["lcov"]
      },
      forceExit: true,
      isVerbose: false,
      specFolders: ["tests"],
      showColors: true
    },
    src: ["src/**/*.js"]
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
    files: ["build/src-bundle.js", "build/test-bundle.js"],
    frameworks: ["jasmine"]
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

  //code quality
  task("lint", ["jsonlint", "jshint", "jscs"]);
  task("format", ["jsbeautifier:write"]);
  task("verify", ["lint", "jsbeautifier:verify"]);

  //test
  task("test", ["jasmine_node:test"]);
  task("coverage", ["jasmine_node:coverage"]); //travis.sh
  task("browserstack", ["browser-test-bundle", "karma:browserstack"]); // travis.sh
  task("browsers", ["browser-test-bundle", "karma:browsers"]);

  //build
  task("browser-bundle", ["browserify:src"]);
  task("browser-test-bundle", ["browserify:src", "browserify:test"]);
  //task("clean", ["clean:build"]);

  //develop
  task("default", ["test", "lint"]);
  task("dev", ["default", "watch"]);
  task("debug", ["browser-test-bundle", "karma:debug"]);

};
