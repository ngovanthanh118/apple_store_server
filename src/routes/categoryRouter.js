const express = require('express');
const categoryRouter = express.Router();
const CategoryController = require('../controllers/categoryController');
const Authentication = require('../untils/auth');

//Get all category
categoryRouter.get('/', CategoryController.getCategories);
//Get product by category id
categoryRouter.get('/:id', CategoryController.getProductByCategoryID);
//create category
categoryRouter.post('/',Authentication.checkLogin, Authentication.checkAdmin,  CategoryController.createCategory);
//edit category
categoryRouter.get('/edit/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.editCategory)
//update category
categoryRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.updateCategory);

//delete category
categoryRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.deleteCategory);

module.exports = categoryRouter;