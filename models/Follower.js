const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Follower',
        {
            followerId: {
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
        },
        {
            sequelize,
            tableName: 'Follower',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'followerId' }, { name: 'userId' }],
                },
                {
                    name: 'FK_User_TO_Follower_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
};
