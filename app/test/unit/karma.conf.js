module.exports = function(config) {

    console.error('exporting karma config');
    config.set({

        basePath: '../../../',
        frameworks: ['mocha', 'chai'],
        browser: ['PhantomJS'],
        logLevel: config.LOG_INFO,
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-moment/angular-moment.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-dragdrop/src/angular-dragdrop.js',
            'bower_components/moment/moment.js',

            'app/test/unit/**/*.js',
            'app/scripts/*.js',
            'app/scripts/**/*.js'
        ]
    });
};