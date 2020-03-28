var mongoose = require('mongoose');
var schema = mongoose.Schema;

var deviceSchema = new schema({
    password: {
        type: String,
        required: true
    },
    ipAdress: {
        type: String,
    },
    location: {
        type: [Number],
        default: [0, 0]
    },
    state: {
        type: String,
        default: 'Unknown',
        enum: ['Occupied', 'Free', 'Error', 'Reserved', 'unknown'],
    },
    lastUpdateReceived: {
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('device', deviceSchema);