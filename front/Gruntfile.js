'use strict'

module.exports = (grunt) => {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['views/*.js'],
        dest: 'dist/js/views.js'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};
