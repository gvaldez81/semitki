'use strict'

module.exports = (grunt) => {
  grunt.initConfig({
    clean: ['dist/*'],
    concat: {
      core: {
        options: { footer: '<script type="text/javascript" src="js/semitki.js"></script></html>' },
        src: ['index.html','views/*.hbs'],
        dest: 'dist/index.html'
      },
      views: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => { return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n'); }
        },
        src: ['views/*.js'],
        dest: 'dist/js/views.js'
      },
      models: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => { return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n'); }
        },
        src: ['models/*.js'],
        dest: 'dist/js/models.js'
      },
    },
    copy: {
      css: {
        expand: true, cwd: 'static/css', src: '*.css', dest: 'dist/css/', filter: 'isFile'
      },
      js: {
        expand: true, cwd: 'static/js', src: '*.js', dest: 'dist/js/', filter: 'isFile'
      }
    },
    bower: {
      dev: {
        dest: 'dist',
        js_dest: 'dist/js/vendor',
        css_dest: 'dist/css',
        options: {
          packageSpecific: {
            'bootstrap': {
              files: ['dist/**']
            },
            'handlebars': {
              files: ['./*.js']
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'concat', 'copy', 'bower']);

};
