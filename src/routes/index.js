const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRouter');
const categoryRouter = require('./categoryRouter');
const orderRouter = require('./orderRouter');

router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/comments', commentRouter);

router.use('/categories',categoryRouter);

router.use('/orders', orderRouter);

module.exports = router;