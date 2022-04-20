const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Chat',
        {
            chatId: {
                type: DataTypes.STRING(255),
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            roomId: {
                type: DataTypes.STRING(255),
                allowNull: false,
                references: {
                    model: 'Room',
                    key: 'roomId',
                },
            },
            userId: {
                type: DataTypes.STRING(255),
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'userId',
                },
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'Chat',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'chatId' }],
                },
                {
                    name: 'FK_Room_TO_Chat_1',
                    using: 'BTREE',
                    fields: [{ name: 'roomId' }],
                },
                {
                    name: 'FK_User_TO_Chat_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
};
