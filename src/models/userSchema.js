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
        require: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    colection: 'users'
})
module.exports = mongoose.model('User', UserSchema);