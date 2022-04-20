const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const chatController = require('./controller/chat.controller');

router.get('/', authMiddleware.auth, chatController.getChatList);

module.exports = router;
