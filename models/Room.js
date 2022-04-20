const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Room',
        {
            roomId: {
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
            targetId: {
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
            tableName: 'Room',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'roomId' }],
                },
                {
                    name: 'FK_User_TO_Room_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
                {
                    name: 'FK_User_TO_Room_2',
                    using: 'BTREE',
                    fields: [{ name: 'targetId' }],
                },
            ],
        }
    );
};
