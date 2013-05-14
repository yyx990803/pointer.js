module.exports = function( grunt ) {
  grunt.initConfig({
    jshint: {
      options: {
        'undef': true,
        'browser': true,
        'globals': {
          'console': true,
          'Modernizr': true
        }
      },
      all: ['src/*.js']
    },
    concat: {
      build: {
        dest: 'build/pointer.js',
        src: [
          //'js/bind-polyfill.js',
          'src/libs/modernizr-touch.js',
          'src/pointer.js',
          'src/gesture.js',
          'src/doubletap.js',
          'src/longpress.js',
          'src/scale.js',
          'src/tap.js',
          'src/tripletap.js'
        ]
      }
    },
    qunit: {
      all: ['tests/*.html']
    },
    uglify: {
      build: {
        files: {
          'build/pointer.min.js': ['build/pointer.js']
        }
      }
    },
    watch: {
      concat: {
        files: ['src/**/*.js'],
        tasks: 'concat'
      }
    }
  });
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.registerTask( 'test', [ 'jshint', 'concat', 'qunit' ]);
  grunt.registerTask( 'default', [ 'jshint', 'concat', 'qunit', 'uglify' ] );
}