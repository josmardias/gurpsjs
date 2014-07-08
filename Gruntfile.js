/* global module: true */
module.exports = function (grunt) {
  "use strict";

  var hintFiles = [
    "bower.json",
    "Gruntfile.js",
    "package.json",
    ".jshintrc",
    ".jsbeautifyrc",
    "src/**/*.js",
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
        basePath: "..", //default is configFile path
        files: ["src/gurps.js", "src/*.js", "test/*.js"],
        frameworks: ["jasmine"]
      },
      browserstack: {
        configFile: "karma/browserstack.conf.js",
        singleRun: true
      },
      local: {
        configFile: "karma/local.conf.js"
      },
      debug: {
        configFile: "karma/debug.conf.js",
        autoWatch: true,
        usePolling: true /* hack to make autoWatch work */
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
  grunt.registerTask("test", ["jasmine"]); //through phantomjs
  grunt.registerTask("coverage", ["karma:coverage"]);
  grunt.registerTask("browserstack", ["karma:browserstack"]);
  grunt.registerTask("browsers", ["karma:local"]);

  //code quality
  grunt.registerTask("format", ["jshint", "jsbeautifier:write"]);
  grunt.registerTask("verify", ["jshint", "jsbeautifier:verify"]);
  grunt.registerTask("lint", ["jshint"]);

  //build
  grunt.registerTask("build", ["autowrap:nodefy"]);
  //grunt.registerTask("clean", ["clean:build"]);

  //develop
  grunt.registerTask("debug", ["karma:debug"]);
  grunt.registerTask("dev", ["default", "watch"]);
  grunt.registerTask("default", ["test", "verify"]);

};
