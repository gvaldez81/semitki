'use strict'

module.exports = (grunt) => {
  grunt.initConfig({
    concat: {
      options: {
        process: function(src, filepath) {
          return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        },
      },
      templates: {
        src: ['index.html','views/*.hbs'],
        dest: 'dist/index.html'
      },
      views: {
        src: ['views/*.js'],
        dest: 'dist/js/views.js'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};
