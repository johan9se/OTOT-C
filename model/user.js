const mongoose = require('mongoose');
var Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String
    },
})

module.exports = mongoose.model('user', userSchema)
