var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Fixture = new Schema({
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    kickoff: {
        type: Date,
    },
    meetTime: {
        type: Date,
    },
    mapsLink: {
        type: String
    },
    description: {
        type: String
    },
    squad: {
        type: Object
    },
    teamId: {
        type: String
    },
    opposition: {
        type: String
    },
    confirmed: {
        type: Boolean
    }
}, {
    collection: 'fixtures'
});


module.exports = mongoose.model('fixture', Fixture);