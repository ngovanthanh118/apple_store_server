const Order = require('../models/orderSchema');
const stripe = require('stripe');
class OrderController {
    //GET all category
    // async getOrders(req, res) {
    //     try {
    //         const page_size = 5;
    //         const page = req.query.page ?? 1;
    //         const skip = (page - 1) * page_size;
    //         const total = await Category.countDocuments({});
    //         const categories = await Category.find({}).skip(skip).limit(page_size);
    //         if (categories.length > 0) {
    //             res.status(200).send({ totalDoc: total, pageSize: page_size, data: categories });
    //         }
    //         else {
    //             res.status(400).send({ msg: 'Does not exist category!' });
    //         }
    //     } catch (error) {
    //         res.status(500).send({ msg: error.message });
    //     }
    // }
    //Create order
    async createOrder(req, res) {
        try {
            const { user_id, name, phone, address, details, note } = req.body;
            await Order.create({
                user_id: user_id,
                name: name,
                phone: phone,
                address: address,
                details: details,
                note: note
            })
                .then(data => res.status(200).send({ data: data, msg: 'Order successfully!' }))
                .catch(err => res.status(400).send({ msg: err }));
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

}
module.exports = new OrderController();