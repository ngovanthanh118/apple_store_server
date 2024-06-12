const Product = require('../models/productSchema');
const Comment = require('../models/commentSchema');
const fs = require('fs');
const path = require('path');

class ProductController {
    //get all product
    async getAllProducts(req, res) {
        try {
            const products = await Product.find({ status: true });
            if (products.length > 0) {
                res.status(200).send({ data: products });
            }
            else {
                res.status(400).send({ msg: 'Does not exist product!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //get product pagination
    async getProducts(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const total = await Product.countDocuments({});
            const products = await Product.find({}).skip(skip).limit(page_size);
            res.status(200).send({ error: false, totalDoc: total, pageSize: page_size, data: products });

        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
    //get one product
    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            await Product.find({ name: product.name })
                .then(data => res.status(200).send({
                    error: false, data: {
                        productDetail: product,
                        productSimilar: data
                    }
                }))
                .catch(error => res.status(400).send({ error: true, msg: error }))
        } catch (error) {
            res.status(400).send({ error: true, msg: error.message });
        }
    }
    //create product
    async createProduct(req, res) {
        try {
            console.log(req.files);
            const images = req.files.map(file => file.filename);
            await Product.create({ ...req.body, images: images, colors: JSON.parse(req.body.colors) })
                .then(data => res.status(200).send({ error: false, data: data, msg: 'Create product successfully!' }))
                .catch(err => res.status(400).send({ error: true, msg: err }));

        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
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
            if (req.files.length > 0) {
                const images = req.files.map(file => file.filename);
                const product = await Product.findById(id);
                product.images.forEach(image => {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/' + image));
                });
                await Product.findByIdAndUpdate({ _id: id }, { ...req.body, images: images, colors: JSON.parse(req.body.colors) })
                    .then(data => res.status(200).send({ data: data, msg: 'Update product successfully!' }))
                    .catch(err => res.status(400).send({ msg: 'Update product failured!', error: err }));
            }
            else {
                await Product.findByIdAndUpdate({ _id: id }, { ...req.body, colors: JSON.parse(req.body.colors) })
                    .then(data => res.status(200).send({ data: data, msg: 'Update product successfully!' }))
                    .catch(err => res.status(400).send({ msg: 'Update product failured!', error: err }));
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });

        }
    }
    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);
            if (product) {
                product.images.length > 0 && product.images.forEach(image => {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/' + image));
                });
                await Product.findByIdAndDelete(id)
                    .then(data => res.status(200).send({ msg: 'Delete product successfully!' }))
                    .catch(err => res.status(400).send({ msg: 'Delete product failured!' }));
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

}

module.exports = new ProductController();