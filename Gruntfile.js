module.exports = function(grunt) {

  // Grunt Config
  // -----------------------------------------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        src: 'app.js',
        dest: 'chrome-extension/content-scripts/js/bundle.js'
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          noCache: true
        },
        files: {
          'chrome-extension/content-scripts/css/main.css': 'assets/css/main.scss',
          'chrome-extension/browser-action/css/main.css': 'assets/css/pop_up.scss'
        }
      }
    },
    jshint: {
      all: [
        'collections/*.js',
        'controllers/*.js',
        'models/*.js',
        'views/*.js',
        'Gruntfile.js'
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