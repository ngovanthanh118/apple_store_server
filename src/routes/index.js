const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRouter');

router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/comments', commentRouter);


module.exports = router;