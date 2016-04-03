var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, User) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({
            'username': username,
            'password': password
        }, function(err, user){

            if(err){
                console.error('error finding user');
                return done(err);
            }

            if (!user) {
                console.log("couldn't find user");
                return done(null, false);
            }

            if (user.password != password) {
                console.log('incorrect password');
                return done(null, false);
            }

            console.log('login success, returning user');
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });
};