const { User } = require('../../models');

module.exports = {
    createUser: async (email, nickname, password) => {
        try {
            return await User.create({ email, nickname, password });
        } catch (error) {
            console.log(error);
        }
    },
    chkByEmail: (email) => {
        try {
            return User.findOne({ where: { email } });
        } catch (error) {
            console.log(error);
        }
    },
    chkByNickname: (nickname) => {
        try {
            return User.findOne({ where: { nickname } });
        } catch (error) {
            console.log(error);
        }
    },
};
