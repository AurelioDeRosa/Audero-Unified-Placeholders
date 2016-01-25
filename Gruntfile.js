module.exports = function (grunt) {
   require('time-grunt')(grunt);
   require('jit-grunt')(grunt);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jscs: {
         options: {
            config: '.jscsrc',
            fix: true
         },
         dist: '<%= jshint.src %>'
      },

      jshint: {
         options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
         },
         src: 'src/jquery.auderoUnifiedPlaceholders.js'
      },

      uglify: {
         options: {
            banner: '/* Audero Unified Placeholder <%= pkg.version %> | Aurelio De Rosa (@AurelioDeRosa) | MIT/GPL-3.0 Licensed */\n'
         },
         dist: {
            files: {
               'src/jquery.auderoUnifiedPlaceholders.min.js': ['src/jquery.auderoUnifiedPlaceholders.js']
            }
         }
      }
   });

   grunt.registerTask('build', [
      'uglify'
   ]);

   grunt.registerTask('default', [
      'jscs',
      'jshint',
      'build'
   ]);

}