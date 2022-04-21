const userService = require('../service/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('../../config/redis');

module.exports = {
    signup: async (req, res) => {
        const { email, nickname, password } = req.body;
        try {
            if (await userService.chkByEmail(email)) {
                return res.status(400).send({
                    result: false,
                    message: '이미 ID가 존재합니다',
                });
            }
            if (await userService.chkByNickname(nickname))
                return res.status(400).send({
                    result: false,
                    message: '이미 닉네임이 존재합니다',
                });
            const hashedPwd = await bcrypt.hashSync(password, 10);
            await userService.createUser(email, nickname, hashedPwd);
            res.send({ result: true });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const agent = req.headers['user-agent'];

        try {
            const user = await userService.chkByEmail(email);
            if (!user)
                return res.status(400).send({
                    result: false,
                    message: '이메일이나 비밀번호가 잘못되었습니다',
                });
            if (!bcrypt.compareSync(password, user.password))
                return res.status(400).send({
                    result: false,
                    message: '이메일이나 비밀번호가 잘못되었습니다',
                });

            const payload = { userId: user.userId, nickname: user.nickname };
            const accessToken = jwt.sign(payload, process.env.ACCESSKEY, {
                expiresIn: process.env.ATOKENEXPIRE,
            });
            const refreshToken = jwt.sign(
                { email: user.email },
                process.env.REFRESHKEY,
                { expiresIn: process.env.RTOKENEXPIRE }
            );

            const key = user.userId + agent;

            await redis.set(key, refreshToken);

            res.send({
                result: true,
                atoken: accessToken,
                rtoken: refreshToken,
                email: user.email,
                nickname: user.nickname,
                userId: user.userId,
            });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    auth: (req, res) => {
        const { email, nickname, userId, profileImageUrl } = res.locals;

        res.send({ result: true, email, nickname, userId, profileImageUrl });
    },
    facebookCallback: async (req, res) => {
        const email = req.user._json.email;
        const agent = req.headers['user-agent'];
        try {
            const user = await userService.chkByEmail(email);

            const payload = { userId: user.userId, nickname: user.nickname };
            const accessToken = jwt.sign(payload, process.env.ACCESSKEY, {
                expiresIn: process.env.ATOKENEXPIRE,
            });
            const refreshToken = jwt.sign(
                { email: user.email },
                process.env.REFRESHKEY,
                { expiresIn: process.env.RTOKENEXPIRE }
            );

            const key = user.userId + agent;

            await redis.set(key, refreshToken);

            res.cookie('ACCESS_TOKEN', accessToken, {
                sameSite: 'None',
                secure: 'true',
                httpOnly: true,
            });
            res.cookie('REFRESH_TOKEN', refreshToken, {
                sameSite: 'None',
                secure: 'true',
                httpOnly: true,
            });

            return res.redirect('/');
            // return res.send({
            //     result: true,
            //     atoken: accessToken,
            //     rtoken: refreshToken,
            //     email: user.email,
            //     nickname: user.nickname,
            //     userId: user.userId,
            // });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
};
