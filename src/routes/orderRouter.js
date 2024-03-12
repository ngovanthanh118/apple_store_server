const express = require('express');
const orderRouter = express.Router();
const OrderController = require('../controllers/orderController');
// const Authentication = require('../untils/auth');

//Get all category
// orderRouter.get('/', OrderController.getCategories);
//create category
orderRouter.post('/', OrderController.createOrder);
//edit category
// orderRouter.get('/edit/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.editCategory)
// //update category
// orderRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.updateCategory);

// //delete category
// orderRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.deleteCategory);

module.exports = orderRouter;