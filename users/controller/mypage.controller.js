const userService = require('../service/user.service');
module.exports = {
    getMypage: async (req, res) => {
        const { userId } = req.params;
        const data = await userService.getAllByUserId(userId);
        res.send({ result: true, data });
    },
};
