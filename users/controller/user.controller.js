const userService = require('../service/userService');
const bcrypt = require('bcrypt');

module.exports = {
    signup: async (req, res) => {
        const { email, nickname, password } = req.body;
        try {
            if (await userService.chkByEmail(email))
                return res.send({
                    result: false,
                    message: '이미 ID가 존재합니다',
                });
            if (await userService.chkByNickname(nickname))
                return res.send({
                    result: false,
                    message: '이미 닉네임이 존재합니다',
                });
            const hashedPwd = await bcrypt.hashSync(password, 10);
            userService.createUser(email, nickname, hashedPwd);
            res.send({ result: true });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!userService.chkByEmail(email))
                return res.send({
                    result: false,
                    message: '이메일이나 비밀번호가 잘못되었습니다',
                });
        } catch (error) {}
    },
};
