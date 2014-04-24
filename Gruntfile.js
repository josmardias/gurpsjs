/* global module: true */
module.exports = function (grunt) {
    "use strict";

    var jsbeautifierList = [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js',
        '!test/lib/*'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            files: ['test/*.html']
        },
        watch: {
            files: ['test/*.js', 'test/*.html', 'src/*.js'],
            tasks: ['qunit']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        jsbeautifier: {
            "write": {
                src: jsbeautifierList,
                options: {
                    config: ".jsbeautifyrc"
                }
            },
            "verify": {
                src: jsbeautifierList,
                options: {
                    config: ".jsbeautifyrc",
                    mode: "VERIFY_ONLY"
                }
            }
        }
    });
    // load up your plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // register one or more task lists (you should ALWAYS have a "default" task list)
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('format', ['jsbeautifier:write', 'jshint']);
    grunt.registerTask('verify', ['jsbeautifier:verify', 'jshint']);
    grunt.registerTask('default', ['verify', 'test']);
};
