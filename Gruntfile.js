/* jshint camelcase: false */
module.exports = function (grunt) {
  "use strict";

  var hintFiles = [
    "bower.json",
    "Gruntfile.js",
    "package.json",
    ".jshintrc",
    ".jsbeautifyrc",
    "src/**/*.js",
    "src/.jshintrc",
    "test/**/*.js",
    "test/.jshintrc",
    "karma/**/*.js",
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      files: hintFiles,
      tasks: ["test"]
    },
    jshint: {
      files: hintFiles,
      options: {
        extensions: ".js, .jshintrc, .jsbeautifyrc",
        jshintrc: true
      }
    },
    jsbeautifier: {
      "write": {
        src: hintFiles,
        options: {
          config: ".jsbeautifyrc"
        }
      },
      "verify": {
        src: hintFiles,
        options: {
          config: ".jsbeautifyrc",
          mode: "VERIFY_ONLY"
        }
      }
    },
    browserify: {
      options: {
        debug: true,
      },
      src: {
        src: "./src/gurps.js",
        dest: "./build/src-bundle.js"
      },
      test: {
        options: {
          external: ["./src/**/*.js"],
        },
        src: "./tests/**/*.js",
        dest: "./build/test-bundle.js"
      }
    },
    jasmine_node: {
      test: {
        options: {
          captureExceptions: true,
          coverage: false,
          forceExit: true,
          isVerbose: false,
          specFolders: ["tests"],
          showColors: true
        },
        src: ["src/**/*.js"]
      },
      coverage: {
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
      }
    },
    clean: {
      build: ["lib"]
    },
    karma: {
      options: {
        basePath: "..", //default is configFile path
        files: ["build/src-bundle.js", "build/test-bundle.js"],
        frameworks: ["jasmine"]
      },
      browserstack: {
        configFile: "karma/browserstack.conf.js"
      },
      browsers: {
        configFile: "karma/browsers.conf.js"
      },
      debug: {
        configFile: "karma/debug.conf.js"
      },
      test: {
        configFile: "karma/test.conf.js"
      },
      coverage: {
        configFile: "karma/coverage.conf.js"
      }
    }
  });

  /* loading plugins */

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-jasmine-node-coverage");
  grunt.loadNpmTasks("grunt-karma");

  /* tasks */

  //code quality
  grunt.registerTask("lint", ["jshint"]);
  grunt.registerTask("format", ["jshint", "jsbeautifier:write"]);
  grunt.registerTask("verify", ["jshint", "jsbeautifier:verify"]);

  //test
  grunt.registerTask("test", ["jasmine_node:test"]);
  grunt.registerTask("coverage", ["jasmine_node:coverage"]); //travis.sh
  grunt.registerTask("browserstack", ["browser-test-bundle", "karma:browserstack"]); // travis.sh
  grunt.registerTask("browsers", ["browser-test-bundle", "karma:browsers"]);

  //build
  grunt.registerTask("browser-bundle", ["browserify:src"]);
  grunt.registerTask("browser-test-bundle", ["browserify:src", "browserify:test"]);
  //grunt.registerTask("clean", ["clean:build"]);

  //develop
  grunt.registerTask("default", ["test", "lint"]);
  grunt.registerTask("dev", ["default", "watch"]);
  grunt.registerTask("debug", ["browser-test-bundle", "karma:debug"]);

};
