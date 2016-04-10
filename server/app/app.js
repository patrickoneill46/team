var bodyParser = require('body-parser'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
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

require('./authentication')(app, User);
require('./routes')(app, User);

app.use('/bower_components', express.static(__dirname + '/../../bower_components/'));
app.use(express.static(__dirname + staticConfig.appDirectory));

app.get('/', function (req, res) {
  console.log('is authenticated');
  res.sendFile('home.html');
});

app.listen(3000, function(){
    console.log('Team app started');
});

