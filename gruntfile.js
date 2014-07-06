module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Package Data
    pkg: grunt.file.readJSON('package.json'),

    // Source Files
    sourceFiles: [
      'source/Core.js',
      'source/Engine.js',
      'source/Particle.js',
      'source/Spring.js',
      'source/math/*.js',
      'source/integrators/Integrator.js',
      'source/integrators/*.js',
      'source/behaviours/Behaviour.js',
      'source/behaviours/*.js'
    ],

    // Test Files
    testFiles: [
      'test/**/*.js'
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

    // Karma Tasks
    karma: {
      options: {
        files: ['<%= sourceFiles %>', '<%= testFiles %>'],
        frameworks: ['jasmine'],
        reporters: ['mocha', 'osx'],
        browsers: ['Chrome'],
        logLevel: 'INFO',
        htmlReporter: {
          outputDir: 'report/jasmine',
          templatePath: 'template/jasmine.html'
        },
        coverageReporter: {
          type : 'html',
          dir : 'report/coverage'
        }
      },
      development: {
        preprocessors: {
          'source/**/*.js': ['coverage']
        },
        // reporters: ['mocha', 'osx', 'coverage', 'html']
        reporters: ['mocha', 'osx', 'coverage']
      },
      continuous: {
        singleRun:true,
        preprocessors: {
          'source/**/*.js': ['coverage']
        },
        reporters: ['mocha', 'osx', 'coverage', 'html']
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

  // Register Tasks
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('test', ['karma:development']);
  grunt.registerTask('default', ['watch']);
};
