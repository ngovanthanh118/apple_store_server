const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');

router.use('/products', productRouter);

router.use('/users', userRouter);

module.exports = router;