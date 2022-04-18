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
    findPost: async (postId) => {
        try {
            return Post.findOne({
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
                    { model: Like, as: 'Likes' },
                    { model: Bookmark, as: 'Bookmarks' },
                ],
                where: { postId },
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
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Comment, as: 'Comments' }, 'createdAt', 'DESC'],
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },

    updatePost: async (postId, userId, content) => {
        try {
            return Post.findOne({ where: { postId, userId } }).then((post) => {
                if (post) {
                    post.update({ content });
                }
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
    findUserList: async () => {
        try {
            return User.findAll({ attributes: ['userId'] });
        } catch (error) {
            console.log(error);
        }
    },
    followPostList: async (targetId) => {
        try {
            return Post.findAll({
                where: { [Op.or]: targetId },
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
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Comment, as: 'Comments' }, 'createdAt', 'DESC'],
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
    nonFollowerPostList: async (targetId) => {
        try {
            return Post.findAll({
                where: { [Op.or]: targetId },
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
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Comment, as: 'Comments' }, 'createdAt', 'DESC'],
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
};
