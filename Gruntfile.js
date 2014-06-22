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
    }
  });

  /* loading plugins */

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-autowrap");

  /* tasks */

  //test
  grunt.registerTask("test", ["jasmine"]);
  //code quality
  grunt.registerTask("format", ["jshint", "jsbeautifier:write"]);
  grunt.registerTask("verify", ["jshint", "jsbeautifier:verify"]);
  grunt.registerTask("lint", ["jshint"]);
  //build
  grunt.registerTask("build", ["autowrap:nodefy"]);
  //develop
  grunt.registerTask("dev", ["default", "watch"]);
  grunt.registerTask("default", ["test", "verify"]);
};
