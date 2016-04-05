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
          'karma-phantomjs-launcher'
        ],

        browsers: [
          'PhantomJS'
        ],

        colors: true,
    });
};