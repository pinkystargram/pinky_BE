var DataTypes = require('sequelize').DataTypes;
var _Bookmark = require('./Bookmark');
var _Comment = require('./Comment');
var _Follow = require('./Follow');
var _Follower = require('./Follower');
var _Like = require('./Like');
var _Post = require('./Post');
var _User = require('./User');
var _Room = require('./Room');
var _Chat = require('./Chat');
var _Timeline = require('./Timeline');

function initModels(sequelize) {
    var Bookmark = _Bookmark(sequelize, DataTypes);
    var Comment = _Comment(sequelize, DataTypes);
    var Follow = _Follow(sequelize, DataTypes);
    var Follower = _Follower(sequelize, DataTypes);
    var Like = _Like(sequelize, DataTypes);
    var Post = _Post(sequelize, DataTypes);
    var User = _User(sequelize, DataTypes);
    var Room = _Room(sequelize, DataTypes);
    var Chat = _Chat(sequelize, DataTypes);
    var Timeline = _Timeline(sequelize, DataTypes);

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
    Follow.belongsTo(User, { as: 'target', foreignKey: 'targetId' });
    User.hasMany(Follow, { as: 'target_Follows', foreignKey: 'targetId' });
    Follower.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Follower, { as: 'Followers', foreignKey: 'userId' });
    Like.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Like, { as: 'Likes', foreignKey: 'userId' });
    Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Post, { as: 'Posts', foreignKey: 'userId' });
    Chat.belongsTo(Room, { as: 'room', foreignKey: 'roomId' });
    Room.hasMany(Chat, { as: 'Chats', foreignKey: 'roomId' });
    Chat.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Chat, { as: 'Chats', foreignKey: 'userId' });
    Room.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Room, { as: 'Rooms', foreignKey: 'userId' });
    Room.belongsTo(User, { as: 'target', foreignKey: 'targetId' });
    User.hasMany(Room, { as: 'target_Rooms', foreignKey: 'targetId' });
    Timeline.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    User.hasMany(Timeline, { as: 'Timelines', foreignKey: 'userId' });
    Timeline.belongsTo(Post, { as: 'post', foreignKey: 'postId' });
    Post.hasMany(Timeline, { as: 'Timelines', foreignKey: 'postId' });

    return {
        Bookmark,
        Comment,
        Follow,
        Follower,
        Like,
        Post,
        User,
        Room,
        Timeline,
        Chat,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
