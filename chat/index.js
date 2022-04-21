const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const chatController = require('./controller/chat.controller');

router.get('/:targetId', authMiddleware.auth, chatController.getChatList);

router.get(
    '/rooms/:roomId',
    authMiddleware.auth,
    chatController.getChatMessage
);

module.exports = router;
