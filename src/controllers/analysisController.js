const Product = require('../models/productSchema');
const Category = require('../models/categorySchema');
const Order = require('../models/orderSchema');
const User = require('../models/userSchema');

class AnaylysisRouter {
    async processAnalysis(req, res) {
        try {
            const totalProduct = await Product.countDocuments({});
            const totalUser = await User.countDocuments({});
            const totalOrder = await Order.countDocuments({});
            const categories = await Category.find({});
            const orders = await Order.find({});
            const productsOrdered = [];
            orders.forEach(order => {
                order?.products.forEach(async (product) => {
                    productsOrdered.push(product);
                })
            })
            res.status(200).send({
                error: false, data: {
                    product: totalProduct,
                    user: totalUser,
                    order: totalOrder,
                    categories: categories,
                    product_ordered: productsOrdered,
                    orders: orders

                }
            })
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
}
module.exports = new AnaylysisRouter();