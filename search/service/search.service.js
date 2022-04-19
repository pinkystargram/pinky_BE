const { User } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
    searchUser: async (searchText) => {
        try {
            return User.findAll({
                where: { nickname: { [Op.like]: `%${searchText}%` } },
                attributes: ['nickname'],
            });
        } catch (error) {
            console.log(error);
        }
    },
};
