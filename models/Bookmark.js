const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Bookmark',
        {
            bookmarkId: {
                type: DataTypes.STRING(255),
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
                    model: 'Post',
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
                    name: 'Bookmark_FK',
                    using: 'BTREE',
                    fields: [{ name: 'postId' }, { name: 'userId' }],
                },
            ],
        }
    );
};
