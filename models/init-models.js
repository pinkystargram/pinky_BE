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

    Post.belongsToMany(User, {
        as: 'userId_Users',
        through: Bookmark,
        foreignKey: 'postId',
        otherKey: 'userId',
    });
    Post.belongsToMany(User, {
        as: 'userId_User_Comments',
        through: Comment,
        foreignKey: 'postId',
        otherKey: 'userId',
    });
    Post.belongsToMany(User, {
        as: 'userId_User_Likes',
        through: Like,
        foreignKey: 'postId',
        otherKey: 'userId',
    });
    User.belongsToMany(Post, {
        as: 'postId_Posts',
        through: Bookmark,
        foreignKey: 'userId',
        otherKey: 'postId',
    });
    User.belongsToMany(Post, {
        as: 'postId_Post_Comments',
        through: Comment,
        foreignKey: 'userId',
        otherKey: 'postId',
    });
    User.belongsToMany(Post, {
        as: 'postId_Post_Likes',
        through: Like,
        foreignKey: 'userId',
        otherKey: 'postId',
    });
    Bookmark.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Bookmark, { as: 'Bookmarks', foreignKey: 'postId' });
    Comment.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Comment, { as: 'Comments', foreignKey: 'postId' });
    Like.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Like, { as: 'Likes', foreignKey: 'postId' });
    Bookmark.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Bookmark, { as: 'Bookmarks', foreignKey: 'userId' });
    Comment.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Comment, { as: 'Comments', foreignKey: 'userId' });
    Follow.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Follow, { as: 'Follows', foreignKey: 'userId' });
    Follower.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Follower, { as: 'Followers', foreignKey: 'userId' });
    Like.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Like, { as: 'Likes', foreignKey: 'userId' });
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
