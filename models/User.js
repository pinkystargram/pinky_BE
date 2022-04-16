const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        'User',
        {
            userId: {
                type: DataTypes.STRING(255),
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            profileImageUrl: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            bio: {
                type: DataTypes.STRING(250),
                allowNull: true,
            },
            followCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            followerCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: 'User',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
    User.assoiate = (models) => {
        User.hasMany(models.Post, { as: 'Posts', foreignKey: 'userId' });
        User.hasMany(models.Like, { as: 'Likes', foreignKey: 'userId' });
        User.hasMany(models.Follower, {
            as: 'Followers',
            foreignKey: 'userId',
        });
        User.hasMany(models.Follow, { as: 'Follows', foreignKey: 'userId' });
        User.hasMany(models.Comment, { as: 'Comments', foreignKey: 'userId' });
        User.hasMany(models.Bookmark, {
            as: 'Bookmarks',
            foreignKey: 'userId',
        });
        User.belongsToMany(models.Post, {
            as: 'postId_Posts',
            through: 'Bookmark',
            foreignKey: 'userId',
            otherKey: 'postId',
        });
        User.belongsToMany(models.Post, {
            as: 'postId_Post_Comments',
            through: 'Comment',
            foreignKey: 'userId',
            otherKey: 'postId',
        });
        User.belongsToMany(models.Post, {
            as: 'postId_Post_Likes',
            through: 'Like',
            foreignKey: 'userId',
            otherKey: 'postId',
        });
    };
    return User;
};
