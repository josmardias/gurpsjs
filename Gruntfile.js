module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            files: ['tests/*.html']
        },
        watch: {
            files: ['tests/*.js', 'tests/*.html', 'src/*.js'],
            tasks: ['qunit']
        },
        jshint: {
            files: ['src/*.js'],
            options: {
                globals: {
                    GURPS: true
                },
                //forin: true,
                indent: 4,
                //jslint legacy
                nomen: false,
                onevar: true
            }
        }
    });
    // load up your plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // register one or more task lists (you should ALWAYS have a "default" task list)
    grunt.registerTask('default', ['jshint', 'qunit']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('hint', ['jshint']);
};