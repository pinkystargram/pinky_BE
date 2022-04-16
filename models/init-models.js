var DataTypes = require('sequelize').DataTypes;
var _Bookmark = require('./Bookmark');
var _Comment = require('./Comment');
var _Follow = require('./Follow');
var _Follower = require('./Follower');
var _Like = require('./Like');
var _Post = require('./Post');
var _User = require('./User');

function initModels(sequelize) {
    var Bookmark = _Bookmark(sequelize, DataTypes);
    var Comment = _Comment(sequelize, DataTypes);
    var Follow = _Follow(sequelize, DataTypes);
    var Follower = _Follower(sequelize, DataTypes);
    var Like = _Like(sequelize, DataTypes);
    var Post = _Post(sequelize, DataTypes);
    var User = _User(sequelize, DataTypes);

    Post.belongsToMany(Post, {
        as: 'userId_Posts',
        through: Bookmark,
        foreignKey: 'postId',
        otherKey: 'userId',
    });
    Post.belongsToMany(Post, {
        as: 'postId_Posts',
        through: Bookmark,
        foreignKey: 'userId',
        otherKey: 'postId',
    });
    // Post.belongsToMany(Post, {
    //     as: 'userId_Post_Comments',
    //     through: Comment,
    //     foreignKey: 'postId',
    //     otherKey: 'userId',
    // });
    // Post.belongsToMany(Post, {
    //     as: 'postId_Post_Comments',
    //     through: Comment,
    //     foreignKey: 'userId',
    //     otherKey: 'postId',
    // });
    // Post.belongsToMany(Post, {
    //     as: 'userId_Post_Likes',
    //     through: Like,
    //     foreignKey: 'postId',
    //     otherKey: 'userId',
    // });
    // Post.belongsToMany(Post, {
    //     as: 'postId_Post_Likes',
    //     through: Like,
    //     foreignKey: 'userId',
    //     otherKey: 'postId',
    // });
    Bookmark.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Bookmark, { as: 'Bookmarks', foreignKey: 'postId' });
    Bookmark.belongsTo(Post, { as: 'user', foreignKey: 'userId' });
    Post.hasMany(Bookmark, { as: 'user_Bookmarks', foreignKey: 'userId' });
    Comment.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Comment, { as: 'Comments', foreignKey: 'postId' });
    Comment.belongsTo(Post, { as: 'user', foreignKey: 'userId' });
    Post.hasMany(Comment, { as: 'user_Comments', foreignKey: 'userId' });
    Like.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Like, { as: 'Likes', foreignKey: 'postId' });
    Like.belongsTo(Post, { as: 'user', foreignKey: 'userId' });
    Post.hasMany(Like, { as: 'user_Likes', foreignKey: 'userId' });
    Follow.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Follow, { as: 'Follows', foreignKey: 'userId' });
    Follower.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Follower, { as: 'Followers', foreignKey: 'userId' });
    Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Post, { as: 'Posts', foreignKey: 'userId' });

    return {
        Bookmark,
        Comment,
        Follow,
        Follower,
        Like,
        Post,
        User,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
