module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
      express: {
            options: {
              // Override defaults here
            },
            dev: {
              options: {
                script: 'server/app/app.js'
              }
            }
        },
        less: {
            development: {
                files: {
                    'styles/styles.css' : ['less/main.less']
                }
            }
        },
        watch: {
            express: {
              files:  [ '**/*.js' ],
              tasks:  [ 'express:dev' ],
              options: {
                spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
              }
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less']
            }
        },
        karma: {
            unit: {
                configFile: 'app/test/unit/karma.conf.js',
                browsers: ['PhantomJS'],
                singleRun: true
            }
        }
    });

    grunt.registerTask('default', [
        'less', 'watch'
    ]);

    grunt.registerTask('test', [
        'karma'
    ]);
}