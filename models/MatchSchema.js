var mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    }
})

module.exports = Match = mongoose.model('matchschema', matchSchema);
