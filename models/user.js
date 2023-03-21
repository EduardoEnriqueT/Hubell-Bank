const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        rerquired: true,
    },
    password: {
        type: String,
        rerquired: true,
    },
    email: {
        type: String,
        rerquired: true,
    },
    balance: {
        type: String,
        rerquired: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    saving: {
        type: String,
        default: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;