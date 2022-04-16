const express = require('express');
const router = express.Router();

const userController = require('./controller/user.controller');
const registerValidator = require('./validator/register.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', registerValidator, userController.signup);
router.post('/login', userController.login);
router.get('/auth', authMiddleware.auth, userController.auth);

router.get('/:userId/mypage', userController.getMypage);

module.exports = router;
