'use strict'

module.exports = (grunt) => {
  grunt.initConfig({
    concat: {
      options: {
        process: function(src, filepath) {
          return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        },
      },
      core: {
        src: ['index.html','views/*.hbs'],
        dest: 'dist/index.html'
      },
      css: {
        src: ['static/css/*.css'],
        dest: 'dist/css/style.css'
      },
      views: {
        src: ['views/*.js'],
        dest: 'dist/js/views.js'
      },
      models: {
        src: ['models/*.js'],
        dest: 'dist/js/models.js'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};
