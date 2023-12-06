const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
        require: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('User', UserSchema);