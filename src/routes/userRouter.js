const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController');
//Register
userRouter.post('/register', UserController.register);

//Login
userRouter.post('/login', UserController.login);

module.exports = userRouter;