const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const postController = require('./controller/post.controller');

router.post('/', upload.single('image'), postController.post);
router.get('/', postController.viewPost);

module.exports = router;
