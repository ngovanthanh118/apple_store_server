const mongoose = require('mongoose');
const moment = require('moment-timezone');
const ProductSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
    },
    version: {
        type: String,
    },
    size: {
        type: String,
    },
    colors: {
        type: Array,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true,
    },
    battery_life: {
        type: Number,
    },
    charger_capacity: {
        type: Number,
    },
    cpu: {
        type: String,
    },
    gpu: {
        type: String,
    },
    material: {
        type: String,
    },
    ram: {
        type: Number,
    },
    refresh_rate: {
        type: Number,
    },
    resolution: {
        type: String,
    },
    screen_size: {
        type: Number,
    },
    screen_type: {
        type: String,
    },
    operating_system: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdAt: {
        type: Date,
        default: moment().tz("Asia/Ho_Chi_Minh").format()
    },
    updatedAt: {
        type: Date,
        default: moment().tz("Asia/Ho_Chi_Minh").format()
    }
}, {
    colection: 'products',
    timestamp: true
})
module.exports = mongoose.model('Product', ProductSchema);