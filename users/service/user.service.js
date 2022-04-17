const { User, Post, Comment, Like, Follow } = require('../../models');
const sequelize = require('sequelize');

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
     * @returns { User Model + Post Model + Comment Model + Like Model}
     * @event userId가 작성한 게시글(+댓글,좋아요)을 반환
     */
    getAllByUserId: (userId) => {
        try {
            return User.findAll({
                where: { userId },
                attributes: {
                    exclude: ['password', 'email', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: Post,
                        as: 'Posts',
                        foreignKey: 'userId',
                        attributes: {
                            exclude: ['userId', 'createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: Comment,
                                as: 'Comments',
                                foreignKey: 'postId',
                                attributes: {
                                    exclude: ['postId', 'updatedAt'],
                                },
                            },
                            {
                                model: Like,
                                as: 'Likes',
                                foreignKey: 'postId',
                                attibutes: ['userId'],
                            },
                        ],
                    },
                ],
                require: true,
            });
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
};
