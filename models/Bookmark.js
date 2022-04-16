const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Bookmark',
        {
            bookmarkId: {
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
        },
        {
            sequelize,
            tableName: 'Bookmark',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'bookmarkId' },
                        { name: 'postId' },
                        { name: 'userId' },
                    ],
                },
                {
                    name: 'FK_Post_TO_Bookmark_1',
                    using: 'BTREE',
                    fields: [{ name: 'postId' }],
                },
                {
                    name: 'FK_User_TO_Bookmark_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
};
