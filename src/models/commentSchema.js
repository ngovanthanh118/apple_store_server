const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user_id: {
        type: String,
    },
    product_id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
}, {
    colection: 'comments',
    timestamps: true,
})
module.exports = mongoose.model('Comment', CommentSchema);