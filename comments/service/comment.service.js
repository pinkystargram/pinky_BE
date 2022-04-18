const { Comment, User } = require('../../models');

module.exports = {
    createComment: async (userId, postId, content) => {
        try {
            return Comment.create({ userId, postId, content });
        } catch (error) {
            console.log(error);
        }
    },
    findComment: async (userId, postId, content) => {
        try {
            return Comment.findOne({
                where: { userId, postId, content },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nickname', 'profileImageUrl'],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
    beforeDeleteComment: async (commentId, userId) => {
        try {
            return Comment.findOne({ where: { commentId, userId } });
        } catch (error) {
            console.log(error);
        }
    },
    deleteComment: async (commentId, userId) => {
        try {
            return Comment.destroy({ where: { commentId, userId } });
        } catch (error) {
            console.log(error);
        }
    },
};
