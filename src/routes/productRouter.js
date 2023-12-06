const express = require('express');
const productRouter = express.Router();
const ProductController = require('../controllers/productController');
const User = require('../models/userSchema');
const upload = require('../untils/upload');
const jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (_id) {
            User.findOne({ _id: _id })
                .then(data => {
                    req.data = data;
                    next();
                })
                .catch(err => {
                    res.status(400).send({ msg: err })
                })
        }
        else {
            res.status(400).send("Please login!");
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
}
const checkAdmin = (req, res, next) => {
    try {
        const isAdmin = req.data.admin;
        if (isAdmin) {
            next();
        }
        else {
            res.status(400).send({ msg: "No admin!" });
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
}
//Get all product
productRouter.get('/', ProductController.getProduct);

//create product
productRouter.post('/', checkLogin, checkAdmin, upload, ProductController.createProduct);

//edit product
productRouter.get('/:id', checkLogin, checkAdmin, ProductController.editProduct);

//update product
productRouter.put('/:id', checkLogin, checkAdmin, upload, ProductController.updateProduct);

//delete product
productRouter.delete('/:id', checkLogin, checkAdmin, ProductController.deleteProduct);

module.exports = productRouter;