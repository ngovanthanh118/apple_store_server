const Category = require('../models/categorySchema');
const Product = require('../models/productSchema');
const fs = require('fs');
const path = require('path');
class CategoryController {
    //GET all category
    async getCategories(req, res) {
        try {
            // const page_size = 5;
            // const page = req.query.page ?? 1;
            // const skip = (page - 1) * page_size;
            // const total = await Category.countDocuments({});
            //const categories = await Category.find({}).skip(skip).limit(page_size);
            const categories = await Category.find({});
            if (categories.length > 0) {
                //res.status(200).send({ totalDoc: total, pageSize: page_size, data: categories });
                res.status(200).send({ error: false, data: categories });
            }
            else {
                res.status(200).send({ error: true, msg: 'Does not exist category!' });
            }
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
    async getCategorieList(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const total = await Category.countDocuments({});
            const categories = await Category.find({}).skip(skip).limit(page_size);
            res.status(200).send({ totalDoc: total, pageSize: page_size, data: categories });

        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
        }
    }
    //Get product by category id
    async getProductByCategoryID(req, res) {
        try {
            const id = req.params.id;
            const products = await Product.find({ category_id: id });
            if (products.length > 0) {
                res.status(200).send({ error: false, data: products });
            }
            else {
                res.status(200).send({ error: true, data: products, msg: 'Không tồn tại sản phẩm nào' });
            }
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
    //Create category
    async createCategory(req, res) {
        try {
            if (req.file) {
                await Category.create({
                    name: req.body.name,
                    image: req.file.filename
                })
                    .then(data => res.status(200).send({ data: data, error: false, msg: 'Create category successfully!' }))
                    .catch(err => res.status(400).send({ msg: err }));
            } else {
                res.send(400).send({ error: true, msg: 'You need choose a image' })
            }

        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //Edit category
    async editCategory(req, res) {
        try {
            const id = req.params.id;
            await Category.findById(id)
                .then(data => res.status(200).send({ data: data }))
                .catch(err => res.status(400).send({ msg: err }))

        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //Update category

    async updateCategory(req, res) {
        try {
            const id = req.params.id;
            if (req.file) {
                const image = req.file.filename;
                const category = await Category.findById(id);
                fs.unlinkSync(path.join(__dirname, '../../public/images/' + category.image));
                await Category.findByIdAndUpdate({ _id: id }, {
                    name: req.body.name,
                    image: image,
                })
                    .then(() => res.status(200).send({ error: false, msg: "Update category successfully!" }))
                    .catch((err) => res.status(400).send({ error: true, msg: "Update category failure!", error: err }))
            } else {
                await Category.findByIdAndUpdate({ _id: id }, {
                    name: req.body.name,
                })
                    .then(() => res.status(200).send({ error: false, msg: "Update category successfully!" }))
                    .catch((err) => res.status(400).send({ error: true, msg: "Update category failure!", error: err }))
            }
        } catch (error) {
            res.status(500).send({ error: true, msg: error })
        }
    }
    //Delete category
    async deleteCategory(req, res) {
        const id = req.params.id;
        const category = await Category.findById(id);
        try {
            fs.unlinkSync(path.join(__dirname, '../../public/images/' + category.image));
            await Category.findByIdAndDelete(id)
                .then(() => res.status(200).send({ msg: "Delete category successfully!" }))
                .catch(err => res.status(400).send({ msg: err }))
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}
module.exports = new CategoryController();