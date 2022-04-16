const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define(
        'Post',
        {
            postId: {
                type: DataTypes.STRING(255),
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'User',
                    key: 'userId',
                },
            },
            content: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'Post',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'postId' }, { name: 'userId' }],
                },
                {
                    name: 'FK_User_TO_Post_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );

    Post.associate = (models) => {
        Post.hasMany(models.Like, { as: 'Likes', foreignKey: 'postId' });
        Post.hasMany(models.Comment, { as: 'Comments', foreignKey: 'postId' });
        Post.hasMany(models.Bookmark, {
            as: 'Bookmarks',
            foreignKey: 'postId',
        });
        Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
        Post.belongsToMany(models.User, {
            as: 'userId_Users',
            through: 'Bookmark',
            foreignKey: 'postId',
            otherKey: 'userId',
        });
        Post.belongsToMany(models.User, {
            as: 'userId_User_Comments',
            through: 'Comment',
            foreignKey: 'postId',
            otherKey: 'userId',
        });
        Post.belongsToMany(models.User, {
            as: 'userId_User_Likes',
            through: 'Like',
            foreignKey: 'postId',
            otherKey: 'userId',
        });
    };
    return Post;
};
