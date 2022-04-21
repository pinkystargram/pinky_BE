const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const chatController = require('./controller/chat.controller');

router.get('/', authMiddleware.auth, chatController.getChatList);

router.get('/:roomId', authMiddleware.auth, chatController.getChatMessage);

module.exports = router;
