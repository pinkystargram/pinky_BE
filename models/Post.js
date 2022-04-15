const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
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
                    name: 'Post_FK',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
};
