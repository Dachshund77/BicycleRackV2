var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name:{
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 32,
        required: true
    },
    role: {
        type : String,
        default : 'User',
        enum : ['User','Admin'],
        required: true
    },
    password:{
        type: String,
        minlength: 3,
        maxlength: 32,
        required: true
    },
});

module.exports = mongoose.model('user', userSchema);