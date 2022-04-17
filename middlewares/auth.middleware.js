const userService = require('../users/service/user.service');
const jwt = require('jsonwebtoken');

module.exports = {
    auth: async (req, res, next) => {
        try {
            if (!req.headers.authorization)
                return res
                    .status(401)
                    .send({ result: false, message: '로그인 후 사용하세요' });
            const { authorization } = req.headers;

            const [tokenType, tokenValue] = authorization.split(' ');
            if (tokenType !== 'Bearer')
                return res
                    .status(401)
                    .send({ result: false, message: '로그인 후 사용하세요' });

            const authedToken = jwt.verify(tokenValue, process.env.ACCESSKEY);

            const authUser = await userService.chkByUserId(authedToken.userId);

            res.locals.userId = authUser.userId;
            res.locals.email = authUser.email;
            res.locals.nickname = authUser.nickname;

            next();
        } catch (error) {
            try {
                if (error.name === 'TokenExpiredError') {
                    const reAuthorization = req.headers.reauthorization;
                    const [reTokenType, reTokenValue] =
                        reAuthorization.split(' ');
                    if (reTokenType !== 'Bearer')
                        return res.status(401).send({
                            result: false,
                            message: '로그인 후 사용하세요',
                        });
                    const reAuthedToken = jwt.verify(
                        reTokenValue,
                        process.env.REFRESHKEY
                    );
                    const reUser = await userService.chkByEmail(
                        reAuthedToken.email
                    );
                    const payload = {
                        userId: reUser.userId,
                        nickname: reUser.nickname,
                    };
                    const newToken = jwt.sign(payload, process.env.ACCESSKEY, {
                        expiresIn: process.env.ATOKENEXPIRE,
                    });
                    res.send({
                        result: true,
                        atoken: newToken,
                        email: reUser.email,
                        nickname: reUser.nickname,
                    });
                } else {
                    console.log(error);
                    res.status(401).send({
                        result: false,
                        message: '다시 로그인하셔야 합니다',
                        error,
                    });
                }
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    res.status(401).send({
                        result: false,
                        message: '다시 로그인하셔야 합니다',
                        error,
                    });
                } else {
                    console.log(error);
                    res.status(401).send({
                        result: false,
                        message: '다시 로그인하셔야 합니다',
                        error,
                    });
                }
            }
        }
    },
};
