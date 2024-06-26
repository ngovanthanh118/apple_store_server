const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: "null",
    },
    phone: {
        type: String,
        required: true,
        default: "null",
    },
    address: {
        type: String,
        required: true,
        default: "null",
    },
    admin: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    colection: 'users',
    timestamps: true,
})
module.exports = mongoose.model('User', UserSchema);