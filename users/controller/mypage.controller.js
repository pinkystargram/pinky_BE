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
        const followId = req.params.userId;
        const userId = res.locals.userId;

        try {
            await userService.doFollow(followId, userId);
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
};
