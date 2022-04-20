const { User, Chat, Room } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
    findRoom: async ({ userId, targetId, roomId }) => {
        try {
            console.log('!!!', userId, targetId);
            if (!userId || !targetId) {
                //   throw customizedError(MESSAGE.WRONG_REQ, 400);
                throw new Error('잘못된 요청입니다.');
            }

            const findRoom = await Room.findOne({
                where: { roomId },
            });
            console.log('???', findRoom);
            const findUser = await User.findOne({ where: { userId } });
            const findTarget = await User.findOne({
                where: { userId: targetId },
            });

            // 기존 채팅 방이 없으면 생성 후 리턴
            if (!findRoom) {
                await Room.create({
                    userId: findUser.userId,
                    targetId: findTarget.userId,
                });
                return;
            }
            return;
        } catch (error) {
            console.log(error);
        }
    },
    saveChatMessage: async () => {

    },
    getChatRoomList: async (userId) => {
        try {
            let arr = [];
            const rooms = await Room.findAll({
                where: { [Op.or]: [{ userId }, { targetId: userId }] }, // userId나 targetId에 userId가 있는 것을 확인하고
                // include: [{ model: User, as: 'user', attributes: ['nickname', 'profileImageUrl'] }]
            });
            console.log('rooms', rooms);
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].userId === userId) arr.push(rooms[i].targetId);
                else if (rooms[i].targetId === userId) arr.push(rooms[i].userId);
            }
            console.log('arr', arr);
            const data = User.findAll({
                where: {userId: {[Op.in]: arr}},
                attributes: ['nickname', 'profileImageUrl'],
            }).then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].dataValues.roomId = rooms[i].roomId;
                }
                return result;
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};
