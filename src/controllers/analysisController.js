const Product = require('../models/productSchema');
const Category = require('../models/categorySchema');
const Order = require('../models/orderSchema');

class AnaylysisRouter {
    async processAnalysis(req, res) {
        try {
            const totalProduct = await Product.countDocuments({});
            const totalOrder = await Order.countDocuments({});
            const categories = await Category.find({});
            const orders = await Order.find({});
            const orderComplete = await Order.find({ status: "Hoàn thành" });
            const productsOrdered = [];
            orders.forEach(order => {
                if (order.status !== "Đã hủy") {
                    order?.products.forEach(async (product) => {
                        productsOrdered.push(product);
                    })
                }
            })
            const total = orderComplete.reduce((acc, curr) => {
                const temp = curr.products.reduce((temp, prev) => temp + (prev.price * prev.quantity), 0)
                return acc + temp;
            }, 0)
            res.status(200).send({
                error: false, data: {
                    product: totalProduct,
                    order: totalOrder,
                    categories: categories,
                    product_ordered: productsOrdered,
                    orders: orders,
                    total: total,
                }
            })
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
}
module.exports = new AnaylysisRouter();