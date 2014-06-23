/* global module: true */
module.exports = function (grunt) {
  "use strict";

  var hintFiles = [
    "Gruntfile.js",
    "package.json",
    ".jshintrc",
    ".jsbeautifyrc",
    "src/**/*.js",
    "test/**/*.js",
    "test/.jshintrc",
    "karma/*",
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
    jasmine: {
      default: {
        src: ["src/gurps.js", "src/**/*.js"],
        options: {
          keepRunner: true,
          specs: "test/**/*.js"
        }
      }
    },
    autowrap: {
      nodefy: {
        options: {
          wrapType: "exports"
        },
        files: {
          "lib/main.js": ["src/gurps.js", "src/*.js"],
        },
      }
    },
    clean: {
      build: ["lib"]
    },
    karma: {
      options: {
        basePath: "..", //default is *.conf.js path
        files: ["src/gurps.js", "src/*.js", "test/*.js"],
        frameworks: ["jasmine"]
      },
      browserstack: {
        configFile: "karma/browserstack.conf.js",
        singleRun: true
      },
      unit: {
        configFile: "karma/local.conf.js"
      },
      coverage: {
        configFile: "karma/coverage.conf.js",
        singleRun: true
      }
    }
  });

  /* loading plugins */

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-autowrap");
  grunt.loadNpmTasks("grunt-karma");

  /* tasks */

  //test
  var pullRequest = process.env.TRAVIS_PULL_REQUEST,
    travisTasks = ["coverage"];
  if (pullRequest === "false") {
    travisTasks.push("browserstack");
  }
  grunt.registerTask("test", ["jasmine"]); //through phantomjs
  grunt.registerTask("coverage", ["karma:coverage"]);
  grunt.registerTask("browserstack", ["karma:browserstack"]);
  grunt.registerTask("travis", travisTasks)
  grunt.registerTask("browsers", ["karma:unit"]);

  //code quality
  grunt.registerTask("format", ["jshint", "jsbeautifier:write"]);
  grunt.registerTask("verify", ["jshint", "jsbeautifier:verify"]);
  grunt.registerTask("lint", ["jshint"]);

  //build
  grunt.registerTask("build", ["autowrap:nodefy"]);
  //grunt.registerTask("clean", ["clean:build"]);

  //develop
  grunt.registerTask("dev", ["default", "watch"]);
  grunt.registerTask("default", ["test", "verify"]);

};
