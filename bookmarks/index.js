const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const bookmarkController = require('./controller/bookmark.controller');

router.post('/:postId', authMiddleware.auth, bookmarkController.mark);

module.exports = router;
