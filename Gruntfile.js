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
        jslint: {
            source: {
                src: ['src/*.js'],
                directives: {
                    todo: true,
                    continue: true,
                    forin: true,
                    nomen: true,
                    predef: [
                        'GURPS'
                    ]
                },
                options: {
                    errorsOnly: true,
                    failOnError: false
                }
            }
        }
    });
    // load up your plugins
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // register one or more task lists (you should ALWAYS have a "default" task list)
    grunt.registerTask('default', ['jslint', 'qunit']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('lint', ['jslint']);
};