const express = require('express');
const commentRouter = express.Router();
const CommentController = require('../controllers/commentController');
//get comment 
commentRouter.get('/:_id', CommentController.getComments);
//post comment
commentRouter.post('/', CommentController.postComment);

module.exports = commentRouter;