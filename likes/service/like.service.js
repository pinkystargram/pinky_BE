const { Like } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
    findLike: async (postId, userId) => {
        try {
            return Like.findOne({
                where: { postId, userId },
            });
        } catch (error) {
            console.log(error);
        }
    },
    likePost: async (postId, userId) => {
        try {
            return Like.create({ postId, userId });
        } catch (error) {
            console.log(error);
        }
    },
    disLikePost: async (postId, userId) => {
        try {
            return Like.destroy({
                where: { [Op.and]: [{ postId }, { userId }] },
            });
        } catch (error) {
            console.log(error);
        }
    },
};
