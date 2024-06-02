const express = require('express');
const productRouter = express.Router();
const ProductController = require('../controllers/productController');
const upload = require('../untils/upload');
const Authentication = require('../untils/auth');

//Get product pagination
productRouter.get('/', ProductController.getProducts);
//Get all product
productRouter.get('/list', ProductController.getAllProducts);
//create product 
productRouter.post('/create', Authentication.checkLogin, Authentication.checkAdmin, upload.array('images', 10), ProductController.createProduct);
//get one product
productRouter.get('/:id', ProductController.getProduct);
//edit product
productRouter.get('/edit/:id', Authentication.checkLogin, Authentication.checkAdmin, ProductController.editProduct)
//update product
productRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, upload.array('images', 10), ProductController.updateProduct);

//delete product
productRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, ProductController.deleteProduct);

module.exports = productRouter;