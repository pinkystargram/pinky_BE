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
            postId: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Post',
                    key: 'postId',
                },
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
                    fields: [
                        { name: 'commentId' },
                        { name: 'postId' },
                        { name: 'userId' },
                    ],
                },
                {
                    name: 'FK_Post_TO_Comment_1',
                    using: 'BTREE',
                    fields: [{ name: 'postId' }],
                },
                {
                    name: 'FK_User_TO_Comment_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
};
