const express = require('express');
const commentRouter = express.Router();
const CommentController = require('../controllers/commentController');
const Authentication = require('../untils/auth')
//get comment 
commentRouter.get('/:_id', CommentController.getComments);
commentRouter.get('/', Authentication.checkLogin, Authentication.checkAdmin, CommentController.getCommentsList);
commentRouter.get('/:id/detail', Authentication.checkLogin, Authentication.checkAdmin, CommentController.getCommentDetail);

//post comment
commentRouter.post('/', CommentController.postComment);
//delete comment
commentRouter.delete('/:id', Authentication.checkLogin, Authentication.checkAdmin, CommentController.deleteComment);
module.exports = commentRouter;