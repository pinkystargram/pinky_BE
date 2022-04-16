const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const postController = require('./controller/post.controller');

router.get('/', postController.list);

router.post('/', upload.single('image'), postController.post);

router.get('/:postId', postController.viewPost);

module.exports = router;
