module.exports = function (config) {

    'use strict';

    config.set({

        autowatch: true,

        basePath: '../',

        frameworks: ['mocha', 'chai'],

        files: [
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-route/angular-route.js',
          'app/scripts/{,*/}*.js',
          'test/spec/**/*.js'
        ],

        plugins: [
          'karma-chai',
          'karma-mocha',
          'karma-phantomjs-launcher',
          'karma-coverage',
        ],

        browsers: [
          'PhantomJS'
        ],

        colors: true,

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
          // source files, that you wanna generate coverage for
          // do not include tests or libraries
          // (these files will be instrumented by Istanbul)
          'app/scripts/{,*/}*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
    });
};