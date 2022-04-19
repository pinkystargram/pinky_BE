const userService = require('../service/user.service');
module.exports = {
    getMypage: async (req, res) => {
        const { userId } = req.params;
        try {
            const data = await userService.getAllByUserId(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    follow: async (req, res) => {
        const targetId = req.params.userId;
        const userId = res.locals.userId;

        try {
            if (targetId === userId) {
                return res.send({
                    result: false,
                    message: '본인을 팔로우할 수 없습니다',
                });
            }
            const chk = await userService.chkFollow(targetId, userId);
            if (chk) {
                await userService.unFollow(targetId, userId);
            } else {
                await userService.doFollow(targetId, userId);
            }

            res.send({ result: true });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    getUserInfo: async (req, res) => {
        const userId = res.locals.userId;
        try {
            const data = await userService.getUserByUserId(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    // 내가 팔로우한 사람중에 내가 팔로우하지 않은 사람 찾기
    recommend: async (req, res) => {
        const userId = res.locals.userId;

        try {
            const data = await userService.followrecommned(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
};
