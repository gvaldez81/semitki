'use strict'


module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      src: ['dist/*', '!dist/storage/**' ] //do not clean the storage folder
    },


    // Compile LESS
    less: {
      development: {
        options: {
          paths: ['static/css']
        },
        files: {
          'dist/css/style.css': 'static/css/style.less'
        }
      },
      production: {
        options: {
          paths: ['static/css'],
          plugins: [
            new (require('less-plugin-clean-css'))()
          ]
        },
        files: {
          'dist/css/style.css': 'static/css/style.less'
        }
      }
    },


    concat: {
      core: {
        src: ['index.html','views/*.hbs'],
        dest: 'dist/index.html'
      },
      models: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n');
          }
        },
        src: ['models/*.js'],
        dest: 'dist/js/models.js'
      },
      collections: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n');
          }
        },
        src: ['collections/*.js'],
        dest: 'dist/js/collections.js'
      },
      views: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n');
          }
        },
        src: ['views/*.js'],
        dest: 'dist/js/views.js'
      },
    },


    // COPY
    copy: {
      css: {
        files: [
          { // Semitki custom styles
            src: ['*.css'], dest: 'dist/css/',
            expand: true,
            cwd: 'static/css',
            filter: 'isFile'
          },
          { // Javascript
            expand: true,
            src: '*.js',
            dest: 'dist/js/',
            filter: 'isFile'
          },
          { // HTML
            src: ['*.html', '!index.html'],
            dest: 'dist/'
          },
          { // Images PNG only
            expand: true,
            cwd: 'static/img',
            src: '*.png',
            dest: 'dist/img',
          },
          { // Polyglot translations
            expand: true,
            src: 'i18n/**', dest: 'dist', filter: 'isFile'
          },
          { // underscore
            src: 'bower_components/underscore/*.js',
            dest: 'dist/js/'
          },
          { // handlbars
            src: 'bower_components/handlebars/*.js',
            dest: 'dist/js/'
          },

          { // BAckbone
            src: 'bower_components/backbone/*.js',
            dest: 'dist/js/'
          },
          { // bootbox
            src: 'bower_components/bootbox.js/*.js',
            dest: 'dist/js/', filter: 'isFile'
          },
          { // bootstrap-submenu
          src: 'bower_components/bootstrap-submenu/dist/js/*.js',
            dest: 'dist/js/'
          },
          { // bootstrap-submenu css
            src: 'bower_components/bootstrap-submenu/dist/css/*.css',
            dest: 'dist/css/'
          },

          { // Bootstrap CSS
            expand: true,
            cwd: 'bower_components/bootstrap/dist/css',
            src: '*.*', dest: 'dist/css/'
          },
          { // Bootstrap JS
            src: 'bower_components/bootstrap/dist/js/*.js',
            dest: 'dist/js/', filter: 'isFile'
          },
          { //bootstrapfonts
            expand: true,
            cwd: 'bower_components/bootstrap/dist/fonts',
            src: '*', dest: 'dist/fonts', filter: 'isFile'
          },
          { // boostrap-select JS
            expand: true,
            src: 'bower_components/bootstrap-select/dist/js/*.*',
            dest: 'dist/js/'
          },
          { // boostrap-select CSS
            expand: true,
            src: 'bower_components/bootstrap-select/dist/css/*.*',
            dest: 'dist/css/'
          },
          { // datetimepicker js
            src: 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/*.*',
            dest: 'dist/js/'
          },
          { // datetimepicker css
            src: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css/*.*',
            dest: 'dist/css/'
          },
          { // Calendar templates
            expand: true,
            src: 'tmpls/**', dest: 'dist/'
          },
          { // Calendar CSS
            src: 'bower_components/bootstrap-calendar/css/*.css',
            dest: 'dist/css/', filter: 'isFile'
          },
          { // Calendar JS
            src: 'bower_components/bootstrap-calendar/js/*.js',
            dest: 'dist/js/'
          },
          { // jQuery
            expand: true,
            src: 'bower_components/jquery/dist/*.*',
            dest: 'dist/js/',
            filter: 'isFile'
          },
          { // jQuery UI
            expand: true,
            src: 'bower_components/jquery-ui/*.js',
            dest: 'dist/js/',
            filter: 'isFile'
          },
          { // jscookie
            expand: true,
            src: 'bower_components/js-cookie/src/*.js',
            dest: 'dist/js/',
            filter: 'isFile'
          },

          { // moment
            expand: true,
            src: 'bower_components/moment/min/*.*',
            dest: 'dist/js/',
            filter: 'isFile'
          },
          { // requirejs
            expand: true,
            src: 'bower_components/requirejs/*.js',
            dest: 'dist/js/',
            filter: 'isFile'
          },
          { // select2css
            expand: true,
            cwd: 'bower_components/select2/dist/css',
            src: '*', dest: 'dist/css', filter: 'isFile'
          },
          { // select2js
            expand: true,
            cwd: 'bower_components/select2/dist/js',
            src: '*', dest: 'dist/js', filter: 'isFile'
          },
          { // select2boostrap
            expand: true,
            cwd: 'bower_components/select2-bootstrap-theme/dist',
            src: '*', dest: 'dist/css', filter: 'isFile'
          },
        ]
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less')

  grunt.registerTask('default', ['clean', 'less:development', 'concat',
    'copy']);
  grunt.registerTask('production', ['clean', 'less:production', 'concat',
    'copy']);

};
