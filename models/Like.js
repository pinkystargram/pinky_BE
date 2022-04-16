const Sequelize = require('sequelize');
const { UUIDV4 } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Like = sequelize.define(
        'Like',
        {
            likeId: {
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
            tableName: 'Like',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'likeId' },
                        { name: 'postId' },
                        { name: 'userId' },
                    ],
                },
                {
                    name: 'FK_Post_TO_Like_1',
                    using: 'BTREE',
                    fields: [{ name: 'postId' }],
                },
                {
                    name: 'FK_User_TO_Like_1',
                    using: 'BTREE',
                    fields: [{ name: 'userId' }],
                },
            ],
        }
    );
    Like.assoiate = (models) => {
        Like.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
        Like.belongsTo(models.Post, { as: 'post', foreignKey: 'postId' });
    };
    return Like;
};
