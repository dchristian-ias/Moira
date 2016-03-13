module.exports = function(grunt) {

  // Grunt Config
  // -----------------------------------------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      content_scripts: {
        src: 'src/js/apps/content-scripts/app.js',
        dest: 'chrome-extension/content-scripts/js/bundle.js'
      },
      background: {
        src: 'src/js/apps/background/app.js',
        dest: 'chrome-extension/background/js/bundle.js'
      },
      browser_action: {
        src: 'src/js/apps/browser-action/main.js',
        dest: 'chrome-extension/browser-action/js/bundle.js',
        options: {
          extensions: ['.hbs'],
          transform: ['hbsfy']
        }
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          noCache: true
        },
        files: {
          'chrome-extension/content-scripts/css/main.css': 'src/css/main.scss',
          'chrome-extension/browser-action/css/main.css': 'src/css/browser_action.scss'
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/js/apps/background/*.js',
        'src/js/apps/browser-action/*.js',
        'src/js/apps/browser-action/*/*.js',
        'src/js/apps/browser-action/*/*/*.js',
        'src/js/apps/browser-action/*/*/*/*.js',
        'src/js/apps/content-scripts/*.js',
        'src/js/apps/content-scripts/*/*.js'
      ]
    }
  });

  // Load Grunt Tasks
  // -----------------------------------------
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  // Register Grunt Tasks
  // -----------------------------------------
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('build', ['lint', 'browserify', 'sass']);

};