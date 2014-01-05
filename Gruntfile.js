module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    pkg: require('./package.json'),
    express: {
      dev: {
        options: {
          script: './server.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: ['**/*.json', '**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    },
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'server.js'],
        options: {
          force: true
        }
      }
    }
  });

  grunt.registerTask('dev', 
    ['express:dev', 'watch']
  );

  grunt.registerTask('default', ['dev']);

}
