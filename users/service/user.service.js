const { User, Post, Comment, Like, Follow } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    /**
     *
     * @param {*} email : 이메일
     * @param {*} nickname : 닉네임
     * @param {*} password  : 패스워드(암호화)
     * @returns void
     * @event 3개의 User테이블에 회원 생성
     */
    createUser: (email, nickname, password) => {
        try {
            return User.create({ email, nickname, password });
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {*} email : 이메일
     * @returns { User.model }
     * @event email에 대응하는 회원 컬럼 반환
     */
    chkByEmail: (email) => {
        try {
            return User.findOne({ where: { email } });
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {*} nickname
     * @returns { User.model }
     * @event nickname에 대응하는 회원 컬럼 반환
     */
    chkByNickname: (nickname) => {
        try {
            return User.findOne({ where: { nickname } });
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {*} userId : userId 고유값
     * @returns {User Model}\
     * @event userId에 대응하는 회원 칼럼 반환
     */
    chkByUserId: (userId) => {
        try {
            return User.findOne({ where: { userId } });
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {*} userId
     * @returns Post Model (Comment + Like)
     * @event userId가 작성한 글들 반환
     */
    getAllByUserId: (userId) => {
        try {
            return Post.findAll({
                where: { userId },
                attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Comment,
                        as: 'Comments',
                        foreignKey: 'postId',
                        attributes: { exclude: ['postId', 'updatedAt'] },
                    },
                    {
                        model: Like,
                        as: 'Likes',
                        foreignKey: 'postId',
                        attributes: ['userId'],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
    chkFollow: async (targetId, userId) => {
        try {
            return Follow.findOne({ where: { targetId, userId } });
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * TODO:
     * 1이 팔로우한 ID : select * from follow where userid : 1
     * 1을 팔로우한 ID : select * from follow where followId : 1
     *
     * @param {*} followId
     * @param {*} userid
     */
    doFollow: async (targetId, userId) => {
        try {
            await Follow.create({ targetId, userId });
            await User.update(
                { followCount: sequelize.literal('followCount+1') },
                { where: { userId } }
            );
            await User.update(
                { followerCount: sequelize.literal('followerCount+1') },
                { where: { userId: targetId } }
            );
            return;
        } catch (error) {
            console.log(error);
        }
    },
    unFollow: async (targetId, userId) => {
        try {
            await Follow.destroy({ where: { targetId, userId } });
            await User.update(
                { followCount: sequelize.literal('followCount-1') },
                { where: { userId } }
            );
            await User.update(
                { followerCount: sequelize.literal('followerCount-1') },
                { where: { userId: targetId } }
            );
        } catch (error) {
            console.log(error);
        }
    },
    getUserByUserId: (userId) => {
        try {
            return User.findOne({
                where: { userId },
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                `(select count(*) from Post where userId = '${userId}')`
                            ),
                            'postCount',
                        ],
                    ],
                    exclude: [
                        'userId',
                        'email',
                        'password',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                include: [
                    {
                        model: Follow,
                        as: 'Follows',
                        foreignKey: 'userId',
                        attributes: ['targetId'],
                    },
                    {
                        model: Follow,
                        as: 'target_Follows',
                        foreignKey: 'targetId',
                        attributes: ['userId'],
                    },
                ],
            }).then((result) => {
                result.dataValues.followId = [];
                result.dataValues.followerId = [];

                result.Follows.forEach((item) => {
                    result.dataValues.followId.push(item.targetId);
                });

                result.target_Follows.forEach((item) => {
                    result.dataValues.followerId.push(item.userId);
                });

                delete result.dataValues.Follows;
                delete result.dataValues.target_Follows;
                return result;
            });
        } catch (error) {
            console.log(error);
        }
    },
    test: async (userId) => {
        try {
            let arr = [];
            let arr2 = [];

            await Follow.findAll({
                where: { userId },
            }).then((result) => {
                result.forEach((item) => {
                    arr.push(item.targetId);
                });
                return arr;
            });

            await Follow.findAll({
                where: { userId: { [Op.in]: arr } },
            }).then((result) => {
                result.forEach((item) => {
                    arr2.push(item.targetId);
                });
            });

            arr2 = arr2.filter((x) => !arr.includes(x));

            return await User.findAll({
                where: { userId: { [Op.in]: arr2 } },
                attributes: [
                    'nickname',
                    'profileImageUrl',
                    'userId',
                    [sequelize.literal('target_Follows.userId'), 'followId'],
                ],
                include: [
                    {
                        model: Follow,
                        as: 'target_Follows',
                        foreignKey: 'targetId',
                        where: { userId: { [Op.in]: arr } },
                        attributes: [],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    },
};
