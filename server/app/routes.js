var mongoose = require('mongoose'),
    passport = require('passport'),
    path = require('path'),
    Fixture = require('./models/fixture'),
    LocalStrategy = require('passport-local').Strategy,
    staticConfig = require('./config/static');

var playerData = require('../data/players');

module.exports = function(app, User) {

    function getStaticPage(filePath){
        return path.resolve(__dirname + staticConfig.appDirectory + filePath);
    }

    app.get('/signin', function(req, res) {
       res.sendFile(getStaticPage('/signin.html'));
    });

    app.get('/create-account', function(req, res){
       res.sendFile(getStaticPage('/createaccount.html'));
    });

    app.get('/favicon.ico', function(req, res) {

    });

    app.post('/create-account', function(req, res) {

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

    var session, user;
    app.post('/login', passport.authenticate('local'), function(req, res) {


        if (!req.user) {
            res.redirect('/signin');
        }
        res.cookies = req.user.username;
        res.redirect('/');
    });

    app.use('/', function(req, res, next) {
       if(req.isAuthenticated()){
           next();
       } else {
           console.log('redirecting to sigin in');
           res.redirect('signin');
       }
    });

    app.get('/players', function(req, res) {
        res.send(200, playerData);
    });

    require('./routes/users')(app, User);
    require('./routes/fixtures')(app);

    app.get('/', function(req, res) {
        res.sendFile(getStaticPage('home.html'));
    });
};