const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/auth.middleware');

const postController = require('./controller/post.controller');

router.get('/', postController.viewPostList);
router.get('/test', postController.viewPostList2);

router.post(
    '/',
    authMiddleware.auth,
    upload.single('image'),
    postController.post
);

router.get('/:postId', postController.viewPost);

module.exports = router;
