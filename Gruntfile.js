module.exports = function (grunt) {

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

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
      'jshint',
      'build'
   ]);

}