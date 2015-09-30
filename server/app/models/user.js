var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    password: String
}, {
    collection: 'userInfo'
});

module.exports = mongoose.model('userInfo', User);