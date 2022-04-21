const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

router.get('/kakao', passport.authenticate('kakao'));

router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    async (req, res) => {
        const { code } = req.query;
        const { user } = req.session.passport;
        const nickname = await User.findOne({
            where: { email: user },
            attributes: ['nickname', 'userId'],
        });
        const payload = {
            userId: nickname.userId,
            nickname: nickname.nickname,
        };
        const accessToken = await jwt.sign(payload, process.env.ACCESSKEY, {
            expiresIn: process.env.ATOKENEXPIRE,
        });
        const refreshToken = await jwt.sign(
            { email: user },
            process.env.REFRESHKEY,
            { expiresIn: process.env.RTOKENEXPIRE }
        );
        res.header('atoken', accessToken);
        res.header('rtoken', refreshToken);
        res.header('email', user);
        res.header('nickname', nickname.nickname);
        res.header('userId', nickname.userId);
        res.redirect('/');
    }
);
module.exports = router;
