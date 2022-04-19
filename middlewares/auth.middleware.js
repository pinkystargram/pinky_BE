const userService = require('../users/service/user.service');
const jwt = require('jsonwebtoken');

module.exports = {
    auth: async (req, res, next) => {
        try {
            if (!req.headers.authorization)
                return res.status(401).send({
                    result: false,
                    message: '로그인 후 사용하세요',
                    reason: '헤더에 토큰이 없어요',
                });
            const { authorization } = req.headers;

            const [tokenType, tokenValue] = authorization.split(' ');
            if (tokenType !== 'Bearer')
                return res.status(401).send({
                    result: false,
                    message: '로그인 후 사용하세요',
                    reason: '토큰이 Bearer가 아니에요',
                });

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
                            reason: '리프레쉬 토큰이 Bearer가 아니에요',
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
                    res.status(401).send({
                        result: true,
                        atoken: newToken,
                        email: reUser.email,
                        nickname: reUser.nickname,
                        userId: reUser.userId,
                        profileImageUrl: reUser.profileImageUrl,
                    });
                } else {
                    console.log(error);
                    res.status(401).send({
                        result: false,
                        message: '다시 로그인하셔야 합니다',
                        reason: 'access토큰에 문제가 있네요(기한만료가 아닌 에러)',
                        error,
                    });
                }
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    res.status(401).send({
                        result: false,
                        message: '다시 로그인하셔야 합니다',
                        reason: '리프레쉬 토큰까지 만료됐어요',
                        error,
                    });
                } else {
                    console.log(error);
                    res.status(401).send({
                        result: false,
                        message: '다시 로그인하셔야 합니다',
                        reason: '리프레쉬 토큰에 문제가 있네요(기한만료가 아닌 에러)',
                        error,
                    });
                }
            }
        }
    },
};
