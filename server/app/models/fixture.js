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
    mapsLink: {
        type: String
    },
    description: {
        type: String
    },
    squad: {
        type: Object
    }
}, {
    collection: 'fixtures'
});


module.exports = mongoose.model('fixture', Fixture);