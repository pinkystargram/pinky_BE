const { Post, Comment, User } = require('../../models');

module.exports = {
    createComment: async (userId, postId, content) => {
        console.log(postId, userId, content);
        try {
            return Comment.create({ postId, userId, content });
        } catch (error) {
            console.log(error);
        }
    },
    findComment: async (postId) => {
        try {
            return Comment.findAll({
                include: [{ model: User, as: 'user' }],
                where: { postId },
            });
        } catch (error) {
            console.log(error);
        }
    },
};
