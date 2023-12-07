const express = require('express');
const productRouter = express.Router();
const ProductController = require('../controllers/productController');
const upload = require('../untils/upload');
const Authentication = require('../untils/auth');
//Get all product
productRouter.get('/', ProductController.getProduct);

//create product
productRouter.post('/', Authentication.checkLogin, Authentication.checkAdmin, upload, ProductController.createProduct);

//edit product
productRouter.get('/:id', Authentication.checkLogin, Authentication.checkAdmin, ProductController.editProduct);

//update product
productRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, upload, ProductController.updateProduct);

//delete product
productRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, ProductController.deleteProduct);

module.exports = productRouter;