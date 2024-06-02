const express = require('express');
const notificationRouter = express.Router();
const NotificationController = require('../controllers/notificationController');
const Authentication = require('../untils/auth');
//get comment 
notificationRouter.get('/', NotificationController.getNotifications);
notificationRouter.get('/list', Authentication.checkLogin, Authentication.checkAdmin, NotificationController.getNotificationsList);
notificationRouter.get('/:id', Authentication.checkLogin, Authentication.checkAdmin, NotificationController.getNotification);

//post Notifiaction
notificationRouter.post('/', Authentication.checkLogin, Authentication.checkAdmin, NotificationController.createNotification);

//delete Notifiaction
notificationRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, NotificationController.deleteNotification);
module.exports = notificationRouter;