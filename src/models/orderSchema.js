const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    details: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        default: "wait for confirm",
        required: true,
    },
}, {
    collection: 'orders',
    timestamps: true,
})
module.exports = mongoose.model("Order", orderSchema);