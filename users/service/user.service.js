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
     *
     * @param {*} followId
     * @param {*} userid
     */
    doFollow: async (targetId, userId) => {
        try {
            await Follow.findOrCreate({
                where: { targetId, userId },
            });

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
    followrecommned: async (userId) => {
        try {
            let arr = [];
            let arr2 = [];
            let limit = 5;

            await Follow.findAll({
                where: { userId },
            }).then((result) => {
                result.forEach((item) => {
                    arr.push(item.targetId);
                });
                return arr;
            }); //내가 팔로우한 사람 찾기

            await Follow.findAll({
                where: { userId: { [Op.in]: arr } },
            }).then((result) => {
                result.forEach((item) => {
                    arr2.push(item.targetId);
                });
            }); //팔로우한사람이 팔로우한사람 찾기

            arr2 = arr2.filter((x) => !arr.includes(x)); // 겹치는거 빼주기
            arr2.sort(() => Math.random() - 0.5); // 순서 랜덤
            arr2 = [...new Set(arr2)];

            if (arr2.length < 5) limit -= arr2.length;

            let data = await User.findAll({
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
            }).then(async (result) => {
                for (let i = 0; i < result.length; i++) {
                    const count = await Follow.count({
                        where: { targetId: result[i].userId },
                    });
                    result[i].dataValues.count = count - 1;
                }
                return result;
            });

            await User.findAll({
                attributes: ['nickname', 'profileImageUrl', 'userId'],
                order: [['followerCount', 'DESC']],
                limit: limit,
                where: {
                    [Op.and]: [
                        { userId: { [Op.notIn]: arr2 } },
                        { userId: { [Op.notIn]: arr } },
                    ],
                },
            }).then((result) => {
                for (let i = 0; i < result.length; i++) {
                    data.push(result[i]);
                }
            });

            return data;
        } catch (error) {
            console.log(error);
        }
    },
    modify: async (userId, nickname, bio, profileImageUrl) => {
        await User.update(
            {
                bio,
                nickname,
                profileImageUrl,
            },
            {
                where: { userId },
            }
        );
        return;
    },
    getFollow: (userId) => {
        return User.findAll({
            include: [
                {
                    model: Follow,
                    as: 'target_Follows',
                    foreignKey: 'targetId',
                    where: { userId },
                    attributes: [],
                },
            ],
            attributes: ['nickname', 'profileImageUrl', 'userId'],
        });
    },
    getFollower: (userId) => {
        return User.findAll({
            include: [
                {
                    model: Follow,
                    as: 'Follows',
                    foreignKey: 'userId',
                    where: { targetId: userId },
                    attributes: [],
                },
            ],
            attributes: ['nickname', 'profileImageUrl', 'userId'],
        });
    },
};
