const { Comment } = require('../../models');

module.exports = {
    createComment: async (userId, { postId }, content) => {
        console.log(postId, userId, content);
        try {
            return Comment.create({ postId, userId, content });
        } catch (error) {
            console.log(error);
        }
    },
};
