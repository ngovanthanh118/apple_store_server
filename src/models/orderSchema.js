const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
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
    payment_method: {
      type: String,
      required: true
    },
    products: [
      {
        product_id: {
          type: mongoose.Types.ObjectId,
          required: true
        },
        category_id: {
          type: mongoose.Types.ObjectId,
          required: true
        },
        color: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    status: {
      type: String,
      default: "Chờ xử lý",
      required: true,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
