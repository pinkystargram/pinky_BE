const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/auth.middleware');
const postValidation = require('./validator/post.validator');

const postController = require('./controller/post.controller');

router.get('/', postController.viewPostList);

router.post(
    '/',
    authMiddleware.auth,
    upload.single('image'),
    postValidation,
    postController.post
);

router.get('/:postId', postController.viewPost);
router.patch('/:postId', authMiddleware.auth, postController.updatePost);

module.exports = router;
