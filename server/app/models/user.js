var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /([A-Za-z])/g.test(value);
            },
            message: 'Username must contain alpha characters string'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/g.test(value);
            },
            message: 'password must have at least one number and one character'
        }
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    status: {
        type: String,
    },
    position: {
        type: String,
        enum: ['Loosehead', 'Hooker', 'Tighthead', 'Second row', 'Back row', 'Scrum half', 'Out half', 'Centre', 'Wing', 'Fullback']
    },
    secondaryPositions: {
        type: Object
    },
    phoneNumber: {
        type: String
    }
}, {
    collection: 'userInfo'
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userInfo', User);