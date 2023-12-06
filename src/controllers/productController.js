const Product = require('../models/productSchema');
const fs = require('fs');
const path = require('path');
class ProductController {
    //get all product
    async getProduct(req, res) {
        try {
            const products = await Product.find({});
            if (products.length) {
                res.status(200).send({ data: products });
            }
            else {
                res.status(400).send({ msg: 'Does not exist product!' });
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }

    //create product
    async createProduct(req, res) {
        try {
            await Product.create({
                name: req.body.name,
                type: req.body.type,
                storage: req.body.storage,
                color: req.body.color,
                image: req.file.filename,
                description: req.body.description,
                price: req.body.price,
            })
                .then(data => res.status(200).send({ data: data, msg: 'Create product successfully!' }))
                .catch(err => res.status(400).send({ msg: err }));

        } catch (error) {
            console.log(req.body)
            res.status(400).send({ msg: error.message });
        }
    }
    //edit product
    async editProduct(req, res) {
        try {
            const id = req.params.id;
            await Product.findById(id)
                .then(data => res.status(200).send({ data: data }))
                .catch(err => res.status(400).send({ msg: err }))

        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }

    //update product
    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const { name, type, storage, color, description, price } = req.body;
            if (req.file) {
                const image = req.file.filename;
                const product = await Product.findById(id);
                fs.unlinkSync(path.join(__dirname, '../../public/images/' + product.image));
                await Product.findByIdAndUpdate({ _id: id }, {
                    name: name,
                    type: type,
                    storage: storage,
                    color: color,
                    image: image,
                    description: description,
                    price: price,
                })
                    .then(data => res.status(200).send({ data: data, msg: 'Update product successfully!' }))
                    .catch(err => res.status(400).send({ msg: 'Update product failured!' }));
            }
            else {
                await Product.findByIdAndUpdate({ _id: id }, {
                    name: name,
                    type: type,
                    storage: storage,
                    color: color,
                    description: description,
                    price: price,
                })
                    .then(data => res.status(200).send({ data: data, msg: 'Update product successfully!' }))
                    .catch(err => res.status(400).send({ msg: 'Update product failured!' }));
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });

        }
    }
    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);
            if (product) {
                fs.unlinkSync(path.join(__dirname, '../../public/images/' + product.image));
                await Product.findByIdAndDelete(id)
                    .then(data => res.status(200).send({ msg: 'Delete product successfully!' }))
                    .catch(err => res.status(400).send({ msg: 'Delete product failured!' }));
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }

}

module.exports = new ProductController();