const { User, Post, Follower, Comment } = require('../../models');
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
            return User.findAll({
                raw: true,
                include: [{ model: Post, as: 'Posts', foreignKey: 'userId'}],
            });
        } catch (error) {
            console.log(error);
        }
    },
    postUserList: async () => {
        try {
            return Post.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nickname'],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
    postList: async () => {
        try {
            return Post.findAll({
                include: [{ model: Comment, as: 'Comments', separate: true }],
            });
        } catch (error) {
            console.log(error);
        }
    },
    followerList: async (userId) => {
        try {
            return Follower.findAll({ where: { userId } });
        } catch (error) {
            console.log(error);
        }
    },
    followerPostList: async (userId) => {
        try {
            return Post.findAll({
                include: [{ model: Comment, as: 'Comments' }],
                where: { userId },
            });
        } catch (error) {
            console.log(error);
        }
    },
    nonFollowerPostList: async (userId) => {
        try {
            return Post.findAll({
                include: [{ model: User, attributes: ['nickname'] }],
                where: { [Op.ne]: [{ userId }] },
            });
        } catch (error) {
            console.log(error);
        }
    },
};
