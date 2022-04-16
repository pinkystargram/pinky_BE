const { User } = require('../../models');
const { Post } = require('../../models');

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
    chkByUserId: (userId) => {
        try {
            return User.findOne({ where: { userId } });
        } catch (error) {
            console.log(error);
        }
    },
    getAllByUserId: (userId) => {
        try {
            return User.findAll({ where: userId, include: [{ model: Post }] });
        } catch (error) {
            console.log(error);
        }
    },
};
