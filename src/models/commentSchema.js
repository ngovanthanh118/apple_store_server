const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
        default: Date.now,
    },
    product_id:{
        type: String,
        require: true,
    }
}, {
    colection: 'comments'
})
module.exports = mongoose.model('Comment', CommentSchema);