var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    salt: {
        type : String
    },
    password:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', userSchema);