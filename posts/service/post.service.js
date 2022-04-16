const { User, Post, Follower, Like } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
    createPost: async (userId, content, image, location) => {
        try {
            return Post.create({ userId, content, imageUrl: image, location });
        } catch (error) {
            console.log(error);
        }
    },
    findPost: async (userId) => {
        try {
            return User.findOne({ where: { userId } });
        } catch (error) {
            console.log(error);
        }
    },
    followerList: async (userId) => {
        try {
            return Follower.findAll({ where: { userId } });
        } catch (error) {
            console.log('serviceErrer', error);
        }
    },
    followerPostList: async (userId) => {
        try {
            return Post.findAll({
                include: [{ model: User, attributes: ['nickname'] }],
                where: { userId },
            });
        } catch (error) {
            console.log('serviceErrer', error);
        }
    },
    nonFollowerPostList: async (userId) => {
        try {
            return Post.findAll({
                include: [{ model: User, attributes: ['nickname'] }],
                where: { [Op.ne]: [{ userId }] },
            });
        } catch (error) {
            console.log('serviceErrer', error);
        }
    },
};
