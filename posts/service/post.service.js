const { User, Post } = require('../../models');

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
};
