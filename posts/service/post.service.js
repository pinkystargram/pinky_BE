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
                order: [
                    [{ model: Comment, as: 'Comments' }, 'createdAt', 'ASC'],
                ],
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
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nickname', 'profileImageUrl'],
                    },
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

    updatePost: async (postId, userId, content, location) => {
        try {
            return Post.findOne({ where: { postId, userId } }).then((post) => {
                if (post) {
                    post.update({ content, location });
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
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nickname', 'profileImageUrl'],
                    },
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
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nickname', 'profileImageUrl'],
                    },
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
    timeForToday: (time) => {
        const today = new Date();
        const timeValue = new Date(time);

        const betweenTime = Math.floor(
            (today.getTime() - timeValue.getTime()) / 1000 / 60
        ); // ???
        if (betweenTime < 1) return '?????? ???'; // 1??? ???????????? ?????? ???
        if (betweenTime < 60) return `${betweenTime}??? ???`; // 60??? ???????????? n??? ???

        const betweenTimeHour = Math.floor(betweenTime / 60); // ???
        if (betweenTimeHour < 24) return `${betweenTimeHour}?????? ???`; // 24?????? ???????????? n?????? ???

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24); // ???
        if (betweenTimeDay < 7) return `${betweenTimeDay}??? ???`; // 7??? ???????????? n??? ???
        if (betweenTimeDay < 365)
            return `${timeValue.getMonth() + 1}??? ${timeValue.getDate()}???`; // 365??? ???????????? ?????? ???????????? ??? ??????

        return `${timeValue.getFullYear()}??? ${
            timeValue.getMonth() + 1
        }??? ${timeValue.getDate()}???`; // 365??? ???????????? ??? ??? ???
    },
};
