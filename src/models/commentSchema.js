const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
}, {
    colection: 'comments',
    timestamps: true,
})
module.exports = mongoose.model('Comment', CommentSchema);