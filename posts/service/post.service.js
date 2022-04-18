const { User, Post, Follow, Comment, Like, Bookmark } = require('../../models');
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
                include: [{ model: Post, as: 'Posts', foreignKey: 'userId' }],
            });
        } catch (error) {
            console.log(error);
        }
    },
    deletePost: async (postId, userId) => {
        try {
            return Post.destroy({ where: { postId, userId } });
        } catch (error) {
            console.log(error);
        }
    },
    postList: async () => {
        try {
            return Post.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['nickname'] },
                    {
                        model: Comment,
                        as: 'Comments',

                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['nickname', 'profileImageUrl'],
                            },
                        ],
                    },
                    { model: Like, as: 'Likes', attributes: ['userId'] },
                    {
                        model: Bookmark,
                        as: 'Bookmarks',
                        attributes: ['userId'],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
    followList: async (userId) => {
        try {
            return Follow.findAll({
                where: { userId },
                attributes: ['targetId'],
            });
        } catch (error) {
            console.log(error);
        }
    },
    followPostList: async (targetId) => {
        try {
            return Post.findAll({
                where: { userId: targetId },
                include: [
                    { model: User, as: 'user', attributes: ['nickname'] },
                    {
                        model: Comment,
                        as: 'Comments',

                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['nickname', 'profileImageUrl'],
                            },
                        ],
                    },
                    { model: Like, as: 'Likes', attributes: ['userId'] },
                    {
                        model: Bookmark,
                        as: 'Bookmarks',
                        attributes: ['userId'],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
    nonFollowerPostList: async (targetId) => {
        try {
            return Post.findAll({
                where: { userId: { [Op.ne]: targetId } },
                include: [
                    { model: User, as: 'user', attributes: ['nickname'] },
                    {
                        model: Comment,
                        as: 'Comments',

                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['nickname', 'profileImageUrl'],
                            },
                        ],
                    },
                    { model: Like, as: 'Likes', attributes: ['userId'] },
                    {
                        model: Bookmark,
                        as: 'Bookmarks',
                        attributes: ['userId'],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
};
