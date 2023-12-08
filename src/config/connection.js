const mongoose = require('mongoose');
const Product = require('../models/productSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connect to database successfully!'))
            .catch(() => console.log('Connect to database failure!'))
        await Product;
        await Comment;
        await User;
    }
    catch (err) {
        handleError(err);
    }
}

module.exports = { connect };