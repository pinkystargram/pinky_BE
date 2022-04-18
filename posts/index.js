const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/auth.middleware');

const postController = require('./controller/post.controller');

router.get('/', authMiddleware.auth, postController.viewPostList);

router.post(
    '/',
    authMiddleware.auth,
    upload.single('image'),
    postController.post
);

router.get('/:postId', postController.viewPost);

router.delete('/:postId', authMiddleware.auth, postController.deletePost);

module.exports = router;
