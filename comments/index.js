const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const commentController = require('./controller/comment.controller');

router.post('/:postId', commentController.postComment);
router.get('/:postId', commentController.listComment);

module.exports = router;
