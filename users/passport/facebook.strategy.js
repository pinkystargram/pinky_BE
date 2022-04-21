const FacebookStrategy = require('passport-facebook').Strategy;
const userService = require('../service/user.service');
const bcrypt = require('bcrypt');

module.exports = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_SECRETID,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'verified', 'displayName'],
    },
    async (accessToken, refreshToken, profile, cb) => {
        const email = profile._json.email;
        let pass = email + Math.random(1, 100);
        const password = bcrypt.hash(pass, 10);
        try {
            const chk = await userService.chkByEmail(email);
            if (chk) return cb(null, profile);
            let nickname = 'pinky_' + Math.random(1, 1000);
            let chkResult = 1;
            while (!chkResult) {
                let nickChk = await userService.chkByNickname(nickname);
                if (!nickChk) chkResult = 0;
                else nickname = 'pinky_' + Math.random(1, 1000);
            }
            await userService.createFacebook(email, nickname, password);
            res.send({ result: true, atoken: accessToken });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    }
);
