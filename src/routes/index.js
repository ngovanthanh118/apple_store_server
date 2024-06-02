const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRouter');
const notificationRouter = require('./notificationRouter');
const categoryRouter = require('./categoryRouter');
const orderRouter = require('./orderRouter');
const searchRouter = require('./searchRouter');
const checkoutRouter = require('./checkoutRoute');
const analysisRouter = require('./analysisRouter');
router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/comments', commentRouter);

router.use('/notifications', notificationRouter);

router.use('/categories', categoryRouter);

router.use('/orders', orderRouter);

router.use('/search', searchRouter);

router.use('/checkout', checkoutRouter);

router.use('/analysis', analysisRouter);

module.exports = router;