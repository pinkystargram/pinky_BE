const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const commentController = require('./controller/comment.controller');

router.post('/:postId', authMiddleware.auth, commentController.postComment);
router.delete(
    '/:commentId',
    authMiddleware.auth,
    commentController.eraseComment
);

module.exports = router;
