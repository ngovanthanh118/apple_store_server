const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    colection: 'products',
    timestamps: true,
})
module.exports = mongoose.model('Product', ProductSchema);