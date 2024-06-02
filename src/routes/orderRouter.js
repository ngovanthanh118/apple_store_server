const express = require('express');
const orderRouter = express.Router();
const OrderController = require('../controllers/orderController');
const orderController = require('../controllers/orderController');
const Authentication = require('../untils/auth');

orderRouter.get('/', Authentication.checkLogin, Authentication.checkAdmin, OrderController.getOrdersList)
orderRouter.post('/create', OrderController.createOrder);
orderRouter.get('/:id/detail', OrderController.getOrder);
orderRouter.put('/cancel/:id', OrderController.cancelOrder);
orderRouter.get('/:id/list', OrderController.getOrders);
orderRouter.put('/:id', Authentication.checkLogin, Authentication.checkAdmin, OrderController.updateStatusOrder);
orderRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, orderController.deleteOrder);


module.exports = orderRouter;