const express = require('express');
const categoryRouter = express.Router();
const upload = require('../untils/upload');
const CategoryController = require('../controllers/categoryController');
const Authentication = require('../untils/auth');

//Get all category
categoryRouter.get('/', CategoryController.getCategories);
categoryRouter.get('/list', CategoryController.getCategorieList);

//Get product by category id
categoryRouter.get('/:id', CategoryController.getProductByCategoryID);
//create category
categoryRouter.post('/', Authentication.checkLogin, Authentication.checkAdmin, upload.single('image'), CategoryController.createCategory);

//edit category
categoryRouter.get('/edit/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.editCategory)
//update category
categoryRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, upload.single('image'), CategoryController.updateCategory);

//delete category
categoryRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, CategoryController.deleteCategory);

module.exports = categoryRouter;