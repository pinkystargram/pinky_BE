const express = require('express');
const router = express.Router();

const userController = require('./controller/user.controller');
const registerValidator = require('./validator/register.validator');

router.post('/signup', registerValidator, userController.signup);
router.post('/login', userController.login);

module.exports = router;
