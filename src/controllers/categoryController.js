const Category = require('../models/categorySchema');
const Product = require('../models/productSchema');
class CategoryController {
    //GET all category
    async getCategories(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const total = await Category.countDocuments({});
            const categories = await Category.find({}).skip(skip).limit(page_size);
            if (categories.length > 0) {
                res.status(200).send({ totalDoc: total, pageSize: page_size, data: categories });
            }
            else {
                res.status(400).send({ msg: 'Does not exist category!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //Get product by category id
    async getProductByCategoryID(req, res) {
        try {
            const id = req.params.id;
            const products = await Product.find({ type: id });
            if (products.length > 0) {
                res.status(200).send({ data: products });
            }
            else {
                res.status(400).send({ msg: 'Does not exist product in this category!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message, typeof: typeof req.params.id })
        }
    }
    //Create category
    async createCategory(req, res) {
        try {
            const name = req.body.name;
            await Category.create({
                name: name,
            })
                .then(data => res.status(200).send({ data: data, msg: 'Create category successfully!' }))
                .catch(err => res.status(400).send({ msg: err }));
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
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: id }, {
                name: name
            })
                .then(() => res.status(200).send({ msg: "Update category successfully!" }))
                .catch((err) => res.status(400).send({ msg: "Update category failure!", error: err }))
        } catch (error) {
            res.status(500).send({ msg: error })
        }
    }
    //Delete category
    async deleteCategory(req, res) {
        const id = req.params.id;
        try {
            await Category.findByIdAndDelete(id)
                .then(() => res.status(200).send({ msg: "Delete category successfully!" }))
                .catch(err => res.status(400).send({ msg: err }))
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}
module.exports = new CategoryController();