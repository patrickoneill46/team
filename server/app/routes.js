var mongoose = require('mongoose'),
    passport = require('passport'),
    path = require('path'),
    LocalStrategy = require('passport-local').Strategy,
    staticConfig = require('./config/static');

module.exports = function(app, User) {

    app.get('/signin', function(req, res){
       res.sendFile(path.resolve(__dirname + staticConfig.appDirectory + '/signin.html'));
    });

    app.get('/create-account', function(req, res){
       res.sendFile(path.resolve(__dirname + staticConfig.appDirectory + '/createaccount.html'));
    });

    app.get('/favicon.ico', function(req, res){

    });

    app.post('/create-account', function(req, res){

        User.register(new User({
            username: req.body.username,
            password: req.body.password
        }), req.body.password, function(err, createdUser) {

            if(err) {
                console.error(err);
            }

            passport.authenticate('local')( req, res, function() {
                res.redirect('home.html');
            });
        });
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/signin',
        successRedirect: '/home.html'
    }));

    app.use('/', function(req, res, next) {
       if(req.isAuthenticated()){
           next();
       } else {
           console.log('redirecting to sigin in');
           res.redirect('signin');
       }
    });
};