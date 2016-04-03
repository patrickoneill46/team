var bodyParser = require('body-parser'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    path = require('path'),
    routes = require('./routes'),
    session = require('express-session');

var User = require('./models/user'),
    staticConfig = require('./config/static');

mongoose.connect('mongodb://localhost/MyDatabase');

var app = express();

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'team', resave: true, saveUninitialized: true }));
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

require('./routes')(app);

app.use(express.static(__dirname + staticConfig.appDirectory));
app.use('/bower_components', express.static(__dirname + '/../bower_components/'));

app.get('/', function (req, res) {
  console.log('is authenticated');
  res.sendFile('home.html');
});

app.listen(3000);

