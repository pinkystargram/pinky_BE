const userService = require('../users/service/user.service');

module.exports = {
    auth: async (req, res) => {
        try {
            const { authorization } = req.headers;
            const reAuthorization = req.headers.X - Authorization;
            if (!authorization)
                return res
                    .status(401)
                    .send({ result: false, message: '로그인 후 사용하세요' });

            const [tokenType, tokenValue] = authorization.split(' ');
            const reTokenValue = reAuthorization.split(' ')[1];
            if (tokenType !== 'Bearer')
                return res
                    .status(401)
                    .send({ result: false, message: '로그인 후 사용하세요' });

            const userId = verify(tokenValue, reTokenValue);

            const authUser = await userService.chkByUserId(userId);

            return res.send({
                result: true,
                email: authUser.email,
                nickname: authUser.nickname,
            });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    verify: (token, reToken) => {
        try {
            const userId = jwt.verify(token, process.env.ACCESSKEY);
        } catch (error) {
            console.log(error);
        }
    },
};
