const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
class OrderController {

    async createOrder(req, res) {
        try {
            const { user_id, name, phone, payment_method, address, products, note } = req.body;

            await Order.create({
                user_id: user_id,
                name: name,
                phone: phone,
                address: address,
                note: note,
                products: products,
                payment_method: payment_method,
            })
                .then(async (data) => {
                    data.products.forEach(async (product) => {
                        const productById = await Product.findById(product.product_id);
                        const decreaseQuantity = productById.quantity - product.quantity;
                        await Product.findByIdAndUpdate({ _id: product.product_id }, { quantity: decreaseQuantity })
                    })
                    res.status(200).send({ error: false, data: data, msg: "Đặt hàng thành công" });
                })
                .catch((err) => res.status(400).send({ error: true, msg: err.message }));
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
    async getOrders(req, res) {
        try {
            const uid = req.params.id;
            await Order.find({ user_id: uid })
                .then((data) => res.status(200).send({ error: false, data: data }))
                .catch((err) => res.status(400).send({ error: true, msg: err }));
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
    async getOrdersList(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const total = await Order.countDocuments({});
            const orders = await Order.find({}).skip(skip).limit(page_size);
            if (orders.length > 0) {
                res.status(200).send({ totalDoc: total, pageSize: page_size, data: orders });
            }
            else {
                res.status(200).send({ error: false, data: [], msg: 'Does not exist product!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    async getOrder(req, res) {
        try {
            const oid = req.params.id;
            const order = await Order.findById(oid);
            const user = await User.findById(order.user_id);
            const productResponse = await Promise.all(
                order.products.map(async (product) => {
                    const productInfo = await Product.findById(product.product_id).exec();
                    return {
                        ...product._doc,
                        name: productInfo?.name,
                        image: productInfo?.images[0],
                        capacity: productInfo?.capacity,
                    };
                })
            )
            const totalPay = order.products.reduce((preValue, currentValue) => preValue + (currentValue.quantity * currentValue.price), 0);
            res.status(200).send({
                error: false, data: {
                    ...order._doc,
                    products: productResponse,
                    customer: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                    },
                    total_pay: totalPay
                }
            });
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
    async cancelOrder(req, res) {
        try {
            const oid = req.params.id;
            const orderInfo = await Order.findByIdAndUpdate({ _id: oid }, { status: 'Đã hủy' });
            orderInfo.products.forEach(async (product) => {
                const productById = await Product.findById(product.product_id);
                const increaseQuantity = productById.quantity + product.quantity;
                await Product.findByIdAndUpdate({ _id: product.product_id }, { quantity: increaseQuantity });
            })
            res.status(200).send({ error: false, msg: "Hủy đơn hàng thành công" })
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
    async deleteOrder(req, res) {
        const id = req.params.id;
        try {
            await Order.findByIdAndDelete(id)
                .then(data => res.status(200).send({ msg: 'Delete product successfully!' }))
                .catch(err => res.status(400).send({ msg: 'Delete product failured!' }));
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    async updateStatusOrder(req, res) {
        const id = req.params.id;
        try {
            const orderInfo = await Order.findByIdAndUpdate(id, { status: req.body.status })
            if (req.body.status === "Đã hủy") {
                orderInfo.products.forEach(async (product) => {
                    const productById = await Product.findById(product.product_id);
                    const increaseQuantity = productById.quantity + product.quantity;
                    await Product.findByIdAndUpdate({ _id: product.product_id }, { quantity: increaseQuantity });
                })
            }
            res.status(200).send({ error: false, msg: "Cập nhật trạng thái thành công" })
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
}
module.exports = new OrderController();
