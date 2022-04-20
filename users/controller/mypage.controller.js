const userService = require('../service/user.service');
const profileMiddleware = require('../../middlewares/profileMulter');
module.exports = {
    getMypage: async (req, res) => {
        if (req.params.userId === 'undefined')
            return res.send({
                result: false,
                message: '유저정보가 잘못되었습니다',
            });
        const { userId } = req.params;
        try {
            const data = await userService.getAllByUserId(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    follow: async (req, res) => {
        if (req.params.userId === 'undefined')
            return res.send({
                result: false,
                message: '유저정보가 잘못되었습니다',
            });
        const targetId = req.params.userId;
        const userId = res.locals.userId;

        try {
            if (targetId === userId) {
                return res.send({
                    result: false,
                    message: '본인을 팔로우할 수 없습니다',
                });
            }
            const chk = await userService.chkFollow(targetId, userId);
            if (chk) {
                await userService.unFollow(targetId, userId);
            } else {
                await userService.doFollow(targetId, userId);
            }

            res.send({ result: true });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    getUserInfo: async (req, res) => {
        if (req.params.userId === 'undefined')
            return res.send({
                result: false,
                message: '유저정보가 잘못되었습니다',
            });
        const { userId } = req.params;
        try {
            const data = await userService.getUserByUserId(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    // 내가 팔로우한 사람중에 내가 팔로우하지 않은 사람 찾기
    recommend: async (req, res) => {
        const userId = res.locals.userId;

        try {
            const data = await userService.followrecommned(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    modify: async (req, res) => {
        const { userId } = res.locals;
        const { nickname, bio } = req.body;
        let profileImageUrl;
        console.log(nickname);
        console.log(bio);
        if (!req.file) {
            return res.status(400).json({
                result: false,
                message: '이미지를 등록해주세요.',
            });
        }
        if (req.file) profileImageUrl = req.file.location;
        console.log(profileImageUrl);
        console.log(req.body);

        try {
            const User = await userService.chkByUserId(userId);
            if (!User)
                return res.send({
                    result: false,
                    message: '유저정보가 잘못되었습니다',
                });
            if (User.profileImageUrl) {
                profileMiddleware.deleteProfile(User.profileImageUrl);
            }
            await userService.modify(userId, nickname, bio, profileImageUrl);
            res.send({ result: true });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    getFollow: async (req, res) => {
        if (req.params.userId === 'undefined')
            return res.send({
                result: false,
                message: '유저정보가 잘못되었습니다',
            });
        const { userId } = req.params;
        try {
            const data = await userService.getFollow(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
    getFollower: async (req, res) => {
        if (req.params.userId === 'undefined')
            return res.send({
                result: false,
                message: '유저정보가 잘못되었습니다',
            });
        const { userId } = req.params;
        try {
            const data = await userService.getFollower(userId);
            res.send({ result: true, data });
        } catch (error) {
            console.log(error);
            res.send({ result: false, error });
        }
    },
};
