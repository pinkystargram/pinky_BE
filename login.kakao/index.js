const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const kakaoController = require('./controller/login.kakao.controller');

// router.get('/', kakaoController);
// router.get('/callback', kakaoController);

module.exports = router;
