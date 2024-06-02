const express = require('express');
const checkoutRouter = express.Router();

const CheckoutController = require('../controllers/checkoutController');

checkoutRouter.post('/create', CheckoutController.checkoutWithStripe)

module.exports = checkoutRouter;