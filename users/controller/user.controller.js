const userService = require('../service/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    signup: async (req, res) => {
        const { email, nickname, password } = req.body;
        try {
            if (await userService.chkByEmail(email)) {
                return res.send({
                    result: false,
                    message: '이미 ID가 존재합니다',
                });
            }
            if (await userService.chkByNickname(nickname))
                return res.send({
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
        try {
            const user = await userService.chkByEmail(email);
            if (!user)
                return res.send({
                    result: false,
                    message: '이메일이나 비밀번호가 잘못되었습니다',
                });
            if (!bcrypt.compareSync(password, user.password))
                return res.send({
                    result: false,
                    message: '이메일이나 비밀번호가 잘못되었습니다',
                });

            const payload = { userId: user.userId, nickname: user.nickname };
            const accessToken = await jwt.sign(payload, process.env.ACCESSKEY, {
                expiresIn: process.env.ATOKENEXPIRE,
            });
            const refreshToken = await jwt.sign(
                { email: user.email },
                process.env.REFRESHKEY,
                { expiresIn: '3d' }
            );

            res.send({
                result: true,
                atoken: accessToken,
                rtoken: refreshToken,
                email: user.email,
                nickname: user.nickname,
            });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    auth: (req, res) => {
        const { email, nickname } = res.locals;

        res.send({ result: true, email, nickname });
    },
    getMypage: (req, res) => {
        const { userId } = req.params;
        const result = userService.getAllByUserId(userId);
        res.send({ result: true, result });
    },
};
