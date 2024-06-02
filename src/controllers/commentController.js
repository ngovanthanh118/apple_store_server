const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Product = require('../models/productSchema');

const jwt = require('jsonwebtoken');
class CommentController {
    async postComment(req, res) {
        try {
            await Comment.create({ ...req.body })
            res.status(200).send({ error: false });
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
    async getComments(req, res) {
        try {
            const _id = req.params._id;
            const comments = await Comment.find({ product_id: _id });
            if (comments.length > 0) {
                const dataResponse = await Promise.all(
                    comments.map(async (comment) => {
                        const user = await User.findById({ _id: comment.user_id });
                        return {
                            ...comment._doc,
                            customer_name: user?.name
                        }
                    })
                )
                res.status(200).send({ error: false, data: dataResponse });
                return;
            }
            res.status(200).send({ error: false, data: comments });
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async getCommentsList(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const total = await Comment.countDocuments({});
            const comments = await Comment.find({}).skip(skip).limit(page_size);
            if (comments.length > 0) {
                res.status(200).send({ totalDoc: total, pageSize: page_size, data: comments });
            }
            else {
                res.status(200).send({ error: false, data: [], msg: 'Does not exist product!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    async getCommentDetail(req, res) {
        try {
            const id = req.params.id;
            const comment = await Comment.findById(id);
            const user = await User.findById({ _id: comment.user_id });
            const product = await Product.findById({ _id: comment.product_id });
            res.status(200).send({
                error: false, data: {
                    ...comment._doc,
                    customer_name: user?.name,
                    product: {
                        name: product?.name,
                        capacity: product?.capacity,
                        image: product?.images[0]
                    }
                }
            })
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
    async deleteComment(req, res) {
        try {
            const id = req.params.id;
            await Comment.findByIdAndDelete(id)
                .then((data) => res.status(200).send({ error: false, data: data }))
                .catch(err => res.status(400).send({ error: true, msg: err.message }))
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
}

module.exports = new CommentController();