const chatService = require('../service/chat.service');
const postService = require('../../posts/service/post.service');

module.exports = {
    getChatMessage: async (req, res) => {

    },
    getChatList: async (req, res) => {
        const userId = res.locals.userId;
        console.log(userId);

        try {
            const findChatRoom = await chatService.getChatRoomList(userId);
            res.status(200).json({
                result: true,
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
