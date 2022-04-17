const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Comment',
        {
            commentId: {
                type: DataTypes.STRING(255),
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING(255),
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'userId',
                },
            },
            postId: {
                type: DataTypes.STRING(255),
                allowNull: false,
                references: {
                    model: 'Post',
                    key: 'postId',
                },
            },
            content: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'Comment',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'commentId' }],
                },
                {
                    name: 'FK_User_TO_Comment_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
                {
                    name: 'FK_Post_TO_Comment_1',
                    using: 'BTREE',
                    fields: [{ name: 'postId' }],
                },
            ],
        }
    );
};
