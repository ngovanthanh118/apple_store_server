const mongoose = require('mongoose');

const Notifiaction = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    colection: 'notifications',
    timestamps: true,
})
module.exports = mongoose.model('Notifications', Notifiaction);