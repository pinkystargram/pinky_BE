const { Bookmark } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
    findMark: async (postId, userId) => {
        try {
            return Bookmark.findOne({
                where: { [Op.and]: [{ postId }, { userId }] },
            });
        } catch (error) {
            console.log(error);
        }
    },
    MarkPost: async (postId, userId) => {
        try {
            return Bookmark.create({ postId, userId });
        } catch (error) {
            console.log(error);
        }
    },
    unMarkPost: async (postId, userId) => {
        try {
            return Bookmark.destroy({
                where: { [Op.and]: [{ postId }, { userId }] },
            });
        } catch (error) {
            console.log(error);
        }
    },
};
