const { User } = require('../models/');
module.exports = {
    signup: async (req, res) => {
        try {
            const { email, nickname, password } = req.body;

            await User.create({ email, nickname, password });
            return;
        } catch (error) {
            console.log(error);
        }
    },

    find: async (req, res) => {
        try {
            const result = await User.findAll({});
            res.json({ result });
        } catch (error) {
            console.log(error);
        }
    },
};
