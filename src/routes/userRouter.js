const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const upload = require('../untils/upload');
const Authentication = require('../untils/auth');
//Get user
userRouter.get('/', Authentication.checkLogin, UserController.getUser);

//Register

userRouter.post('/register', UserController.register);
//Login
userRouter.post('/login', Authentication.verifyToken, UserController.login);

//Edit user
userRouter.get('/:id', Authentication.checkLogin, UserController.editUser);

//Update user
userRouter.put('/:id', upload.single('image'), UserController.updateUser);
//Asign permission admin
userRouter.put('/:id/permission', Authentication.checkLogin, Authentication.checkAdmin, UserController.asignPermissionAdmin);
//Delete user
userRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, UserController.deleteUser);

module.exports = userRouter;