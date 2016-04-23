var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Team = new Schema({
    teamName: {
        type: String,
        required: true,
    },
    teamCaptain: {
        type: String,
    },
    fixtures: {
        type: Array,
    },
    description: {
        type: String
    },
    squad: {
        type: Object
    }
}, {
    collection: 'teams'
});


module.exports = mongoose.model('team', Team);