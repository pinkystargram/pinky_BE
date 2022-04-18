const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const likeController = require('./controller/like.controller');

router.post('/:postId', authMiddleware.auth, likeController.like);

module.exports = router;
