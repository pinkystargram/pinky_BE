const { User, Chat, Room, Comment } = require('../../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = {
    findRoom: async (userId, targetId, roomId) => {
        try {
            if (!userId || !targetId) {
                //   throw customizedError(MESSAGE.WRONG_REQ, 400);
                throw new Error('잘못된 요청입니다.');
            }

            const findRoom = await Room.findOne({
                where: { roomId },
            });
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
    saveChatMessage: async () => {},
    getChatRoomList: async (userId) => {
        try {
            let arr = [];
            let arr2 = [];
            const rooms = await Room.findAll({
                where: { [Op.or]: [{ userId }, { targetId: userId }] }, // userId나 targetId에 userId가 있는 것을 확인한다.
            });

            // 찾아온 내 채팅방 리스트에는 userId 또는 targetId에 내가 들어있는데 나를 제외하고 상대 user를 찾는다
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].userId === userId) {
                    arr.push(rooms[i].targetId); // rooms.userId가 나랑 같으면 targetId가 상대
                    arr2.push(rooms[i].userId);
                } // rooms.userId가 나랑 같으면 targetId가 상대
                else if (rooms[i].targetId === userId) {
                    // rooms.targetId가 나랑 같으면 userId가 상대
                    arr.push(rooms[i].userId);
                    arr2.push(rooms[i].targetId);
                }
            }
            // arr 배열에는 상대의 userId만 담겨있는 상황이다
            const data = User.findAll({
                where: { userId: { [Op.in]: arr } },
                attributes: [
                    [sequelize.literal('userId'), 'targetId'],
                    'nickname',
                    'profileImageUrl',
                ],
            }).then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].dataValues.roomId = rooms[i].roomId;
                    result[i].dataValues.userId = arr2[i];
                }
                console.log('result', result);
                return result;
            });
            console.log('data', data);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    getChatMessageList: async (roomId, userId) => {
        try {
            return await Chat.findAll({
                where: { roomId },
                order: [['createdAt', 'ASC']],
            }).then((result) => {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].userId === userId)
                        result[i].dataValues.sendUser = 'me';
                    else if (result[i].userId !== userId)
                        result[i].dataValues.sendUser = 'you';
                }
                return result;
            });
        } catch (error) {
            console.log(error);
        }
    },
};
