const Comment = require('../models/commentSchema');
class CommentController {
    async postComment(req, res) {
        try {
            const { title, comment, product_id } = req.body;
            await Comment.create({
                title: title,
                comment: comment,
                product_id: product_id
            })
                .then(data => res.status(200).send({ data: data, msg: "Post comment successfully!" }))
                .catch(err => res.status(400).send({ msg: err }))
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async getComments(req, res) {
        try {
            const _id = req.params._id;
            await Comment.find({ product_id: _id })
                .then(data => res.status(200).send({ data: data }))
                .catch(err => res.status(400).send({ msg: err }))
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new CommentController();