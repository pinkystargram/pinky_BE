const express = require('express');
const router = express.Router();
const passport = require('./passport');

//controller
const userController = require('./controller/user.controller');
const mypageController = require('./controller/mypage.controller');

//validator
const registerValidator = require('./validator/register.validator');
const modifyValidator = require('./validator/modify.validator');

//middleware
const authMiddleware = require('../middlewares/auth.middleware');
const profileMiddleware = require('../middlewares/profileMulter');

router.get('/auth', authMiddleware.auth, userController.auth);
router.post('/signup', registerValidator, userController.signup);
router.post('/login', userController.login);
router.get('/facebook', passport.authenticate('facebook'));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook'),
    userController.facebookCallback
);

router.get('/:userId/mypage', authMiddleware.auth, mypageController.getMypage);
router.get('/:userId/info', authMiddleware.auth, mypageController.getUserInfo);
router.get('/recommend', authMiddleware.auth, mypageController.recommend);
router.get('/:userId/follow', authMiddleware.auth, mypageController.getFollow);
router.get(
    '/:userId/follower',
    authMiddleware.auth,
    mypageController.getFollower
);
router.post('/:userId/follow', authMiddleware.auth, mypageController.follow);
router.put(
    '/info',
    authMiddleware.auth,
    profileMiddleware.uploadProfile.single('profileImageUrl'),
    modifyValidator,
    mypageController.modify
);

module.exports = router;
