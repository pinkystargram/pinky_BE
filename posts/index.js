const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');

const postController = require('./controller/post.controller');

router.post('/', upload.single('image'), postController.post);

module.exports = router;
