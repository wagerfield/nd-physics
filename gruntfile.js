module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({

    // Package Data
    pkg: grunt.file.readJSON('package.json'),

    // Source Files
    sourceFiles: [
      'source/Core.js'
    ],

    // Concat Tasks
    concat: {
      deploy: {
        src: '<%= sourceFiles %>',
        dest: 'deploy/<%= pkg.name %>.js'
      }
    },

    // Uglify Tasks
    uglify: {
      deploy: {
        src: '<%= concat.deploy.dest %>',
        dest: 'deploy/<%= pkg.name %>.min.js'
      }
    },

    // Watch Tasks
    watch: {
      build: {
        files: ['gruntfile.js', '<%= sourceFiles %>'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Tasks
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['watch']);
};
