module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)
  grunt.loadNpmTasks('grunt-express-server')

  grunt.initConfig
    pkg: require('./package.json')
    express:
      dev:
        options:
          cmd: 'coffee'
          script: './server.coffee'
    watch:
      options:
        livereload: true
      express:
        files: ['**/*.json', '**/*.js', '**/*.coffee', '!node_modules/**/*']
        tasks: ['express:dev']
        options:
          spawn: false

  grunt.registerTask 'dev', ['express:dev', 'watch']
  grunt.registerTask 'default', ['dev']

