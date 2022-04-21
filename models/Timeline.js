const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Timeline',
        {
            timelineId: {
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
                allowNull: true,
                references: {
                    model: 'Post',
                    key: 'postId',
                },
            },
            status: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'Timeline',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'timelineId' }],
                },
                {
                    name: 'FK_User_TO_Timeline_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
                {
                    name: 'FK_Post_TO_Timeline_1',
                    using: 'BTREE',
                    fields: [{ name: 'postId' }],
                },
            ],
        }
    );
};
