const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const upload = require('../untils/upload');
//Get user
userRouter.get('/', UserController.getUser);

//Register
userRouter.post('/register', upload, UserController.register);

//Login
userRouter.post('/login', UserController.login);

//Edit user
userRouter.get('/:id', UserController.editUser);

//Update user
userRouter.put('/:id', upload, UserController.updateUser);

//Delete user
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;