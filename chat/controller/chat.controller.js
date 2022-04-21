const chatService = require('../service/chat.service');

module.exports = {
    getChatMessage: async (req, res) => {
        const userId = res.locals.userId;
        const { roomId } = req.params;

        try {
            const getChat = await chatService.getChatMessageList(
                roomId,
                userId
            );
            res.status(200).json({
                result: true,
                data: getChat,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: 'DM 채팅 메세지 조회 중 오류가 발생하였습니다.',
            });
        }
    },
    getChatList: async (req, res) => {
        const userId = res.locals.userId;
        const { targetId } = req.params;

        try {
            const findChatRoom = await chatService.getChatRoomList(
                userId,
                targetId
            );
            res.status(200).json({
                result: '이거맞나요',
                data: findChatRoom,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: 'DM 목록 조회 중 오류가 발생하였습니다.',
            });
        }
    },
};
