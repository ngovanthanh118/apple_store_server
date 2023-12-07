const express = require('express');
const productRouter = express.Router();
const ProductController = require('../controllers/productController');
const upload = require('../untils/upload');
const Authentication = require('../untils/auth');

//Get all product
productRouter.get('/', ProductController.getProducts);

//create product
productRouter.post('/', Authentication.checkLogin, Authentication.checkAdmin, upload, ProductController.createProduct);
//get one product
productRouter.get('/:id',  ProductController.getProduct);
//edit product
productRouter.get('/edit/:id', Authentication.checkLogin, Authentication.checkAdmin,ProductController.editProduct)
//update product
productRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, upload, ProductController.updateProduct);

//delete product
productRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, ProductController.deleteProduct);

module.exports = productRouter;