module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            files: ['tests/*.html']
        },
        watch: {
            files: ['tests/*.js', 'tests/*.html', 'src/*.js'],
            tasks: ['qunit']
        }
    });
    // load up your plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // register one or more task lists (you should ALWAYS have a "default" task list)
    grunt.registerTask('default', ['qunit']);
    grunt.registerTask('test', ['qunit']);
};