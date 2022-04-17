const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Follow',
        {
            followId: {
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
        },
        {
            sequelize,
            tableName: 'Follow',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'followId' }],
                },
                {
                    name: 'FK_User_TO_Follow_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
};
